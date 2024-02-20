import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

interface RoomParams {
    roomId: string,
    peerId: string
}

const rooms: Record<string, string[]> = {};

export const RoomHandler = (socket: Socket) => {

    const createRoomHandler = ({ peerId }: { peerId: string }) => {
        const roomId = uuidv4();

        rooms[roomId] = [];

        socket.emit("room-created", { roomId });
        console.log(`New room created: room#${roomId}`);
        joinRoomHandler({ roomId, peerId });
    }

    const joinRoomHandler = ({ roomId, peerId }: RoomParams) => {
        if(rooms[roomId]){
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.to(roomId).emit('user-joined', { roomId, peerId });
            console.log(`User joined: ${peerId}`);
            socket.emit('get-users', {
                roomId,
                participants: rooms[roomId]
            })
        } else {
            createRoomHandler({ peerId });
        }

        socket.on("disconnect", () => {
            console.log("User disconnected", peerId);
            leaveRoomHandler({ roomId, peerId });
        })
    }

    const leaveRoomHandler = ({ roomId, peerId }: RoomParams) => {
        socket.to(roomId).emit("user-left", peerId);
        rooms[roomId] = rooms[roomId]?.filter((id) => id !== peerId);
    }

    socket.on("create-room", createRoomHandler);
    socket.on("join-room", joinRoomHandler);
    socket.on("leave-room", leaveRoomHandler);
}