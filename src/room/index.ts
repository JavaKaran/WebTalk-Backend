import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export const RoomHandler = (socket: Socket) => {

    const createRoomHandler = () => {
        const roomId = uuidv4();

        socket.emit("room-created", { roomId });
        console.log(`New room created: room#${roomId}`);
    }

    const joinRoomHandler = ({ roomId }: { roomId: string }) => {
        socket.join(roomId);
        console.log(`User joined: room#${roomId}`);
        socket.to(roomId).emit("user-joined");
    }

    socket.on("create-room", createRoomHandler);
    socket.on("join-room", joinRoomHandler);
}