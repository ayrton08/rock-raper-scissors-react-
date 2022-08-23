import requestApi from "../../api/requestApi";
import { setRoomId, setUserId, setRtdbRoomId } from "./gameSlice";

type SetStatus = {
  player: string;
  online: boolean;
  name: string;
  rtdbRoomId: string;
};

export const signIn = (player: string) => {
  return async (dispatch: Function) => {
    const { data } = await requestApi.post("/signup", { name: player });
    dispatch(setUserId(data.id));
  };
};

export const askNewRoom = (userId: string) => {
  return async (dispatch: Function) => {
    const { data } = await requestApi.post("/rooms", { userId });

    dispatch(setRoomId(data.id));
  };
};

export const accessToRoom = (roomId: string, userId: string) => {
  return async (dispatch: Function) => {
    const { data } = await requestApi.get(`/room/${roomId}/?userId=${userId}`);

    dispatch(setRtdbRoomId(data.rtdbRoomId));
  };
};

export const setStatusPlayer = ({
  player,
  online,
  name,
  rtdbRoomId,
}: SetStatus) => {
  return async (dispatch: Function) => {
    const data = await requestApi.post(`/status`, {
      player,
      online,
      name,
      status: true,
      rtdbRoomId,
    });
  };
};

export const getRtdbRoomId = (roomId: string) => {
  return async (dispatch: Function) => {
    const { data } = await requestApi.post("/rtdbRoomId", { roomId });

    dispatch(setRtdbRoomId(data.rtdbRoomId));
  };
};

export const setPlay = ({ name, choise, rtdbRoomId, player }) => {
  return async (dispatch: Function) => {
    const { data } = await requestApi.post("/play", {
      name,
      choise,
      rtdbRoomId,
      player,
    });
  };
};
