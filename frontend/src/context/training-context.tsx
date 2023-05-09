import { createContext, FC, useState, useEffect } from "react";
import { getToken } from "../utils/Token";
import jwt_decode from "jwt-decode";

interface TrainingContextProps {
  idTraining: number;
  userId: number;
  setIdTraining: (id: number) => void;
  setIdUser: (id: number) => void;
}

export const TrainingContext = createContext<TrainingContextProps>({
  idTraining: 0,
  userId: 0,
  setIdTraining: (id: number) => {},
  setIdUser: (id: number) => {},
});

const TrainingContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState<number>(0);
  const [trainingId, setTrainingId] = useState<number>(0);

  useEffect(() => {
    if (token === null) return;
    getUserId(token);
  }, []);

  const getUserId = (token: string): void => {
    const decoded: { nameid: string } = jwt_decode(token);


    setIdUser(parseInt(decoded.nameid));
  };
  const setIdUser = (id: number): void => {
    setUserId(id);
  };

  const setIdTraining = (id: number): void => {
    setTrainingId(id);
  };
  const contextValue: TrainingContextProps = {
    idTraining: trainingId,
    userId: userId,
    setIdUser: setIdUser,
    setIdTraining: setIdTraining,
  };

  return (
    <TrainingContext.Provider value={contextValue}>
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingContextProvider;
