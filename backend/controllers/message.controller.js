const Message = require('../models/message.model')
const Conversation = require('../models/conversation.model')
const errorHandler = require('../utitlities/errorHandler.utilitie')
const asyncHandler = require('../utitlities/asyncHandler.utilitie')
const AppError = require("../utitlities/errorHandler.utilitie");
const { getIO } = require("../socket/socket");
const mongoose = require("mongoose");
const User = require("../models/user.model");

const sendMessage = asyncHandler(async (req, res, next) => {

    const senderId = req.userId

    const receiverId = req.params.receiverId
    const message = req.body.message?.trim()

    if (!senderId || !receiverId || !message) {
        return next(new AppError('A receiver and a non-empty message are required', 400))
    }
    if (!mongoose.isValidObjectId(receiverId)) return next(new AppError('Invalid receiver ID', 400));
    const receiver = await User.findById(receiverId).select('_id');
    if (!receiver) return next(new AppError('Receiver not found', 404));

    // Fixed: Use capital 'Conversation' model to call Mongoose methods
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId], $size: 2 }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    // Fixed: Removed 'new' before Message.create
    const newMessage = await Message.create({
        conversation: conversation._id,
        senderId,
        receiverId,
        message
    })

    if (newMessage) {
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }

    getIO().to(receiverId.toString()).emit('new-message', newMessage);

    res.status(200).json({
        success: true,
        responseData: newMessage
    })
})


const getMessage = asyncHandler(async (req, res, next) => {
  const myId = req.userId;
  const otherParticipantId = req.params.otherParticipantId;
  if (!myId || !otherParticipantId) {
    return next(new AppError("All fields are required", 400));
  }
  if (!mongoose.isValidObjectId(otherParticipantId)) return next(new AppError("Invalid user ID", 400));

  const conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId], $size: 2 }
  });

  if (!conversation) {
    return res.status(200).json({
      success: true,
      responseData: []
    });
  }

  const messages = await Message.find({ conversation: conversation._id }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    responseData: messages
  });
});

module.exports = {sendMessage, getMessage}

