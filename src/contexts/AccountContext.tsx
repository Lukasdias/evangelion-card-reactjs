import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface AccountContextData {
    level: number;
    currentExperience: number,
    picturesCompleted: number,
    experienceToNextLevel: number,
    levelUp: () => void,
    closeLevelUpModal: () => void,
}

interface AccountProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number,
    picturesCompleted: number,
}

export const AccountContext = createContext({} as AccountContextData)

export function AccountProvider({
    children,
    ...rest
}: AccountProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrenteExperience] = useState(rest.currentExperience ?? 0)
    const [picturesCompleted, setPicturesCompleted] = useState(rest.picturesCompleted ?? 0)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(picturesCompleted))
    }, [level, currentExperience, picturesCompleted])

    function levelUp() {
        let finalExperience = currentExperience + 60


        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            setLevel(level + 1);
            setIsLevelModalOpen(true);
        }
        setCurrenteExperience(finalExperience);
        setPicturesCompleted(picturesCompleted + 1)
    }

    function closeLevelUpModal() {
        setIsLevelModalOpen(false);
    }

    return (
        <AccountContext.Provider
            value={
                {
                    level,
                    currentExperience,
                    experienceToNextLevel,
                    picturesCompleted,
                    closeLevelUpModal,
                    levelUp,
                }
            }
        >
            {children}
            {
                isLevelUpModalOpen && <LevelUpModal />
            }
        </AccountContext.Provider>
    )
}