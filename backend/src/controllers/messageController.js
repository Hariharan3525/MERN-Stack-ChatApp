import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocket, io } from "../lib/socket.js"
import Message from "../models/MessageModel.js"
import User from "../models/UserModel.js"

export const getUsersForSidebar = async (req,res) => {
    try{
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    }
    catch(error){
        console.log("Error in getUsersForSidebar controller:",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages = async (req,res) => {
    try{
        const {id:userToChatId} = req.params 
        const myId = req.user._id 
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    }
    catch(error){
        console.log("Error in getMessages controller:",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const sendMessage = async (req,res) => {
    try{
        const {text,image} = req.body 
        const {id:receiverId} = req.params
        const senderId = req.user._id 
        let imageUrl
        if(image){
            try{
                const uploadResponse = await cloudinary.uploader.upload(image)
                imageUrl = uploadResponse.secure_url 
            }
            catch(error){
                console.error("Error uploading image to Clodinary:",error)
                return res.status(500).json({error:"Failed to upload image"})
            }
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save()
        
        // todo: realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocket(receiverId)
        if(receiverSocketId)
            io.to(receiverSocketId).emit("newMessage",newMessage)   // private chat

        res.status(201).json(newMessage)
    }
    catch(error){
        console.log("Error in sendMessage controller:",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}