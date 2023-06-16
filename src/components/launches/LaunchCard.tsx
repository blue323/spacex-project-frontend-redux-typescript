import React from 'react';
import './LaunchCard.css'
import { Link } from 'react-router-dom';
import { useAppSelector} from "../../reducers/hooks"

type LaunchCardType = {
    id: string, 
    name:string, 
    date: string,
    patch: string,
    launchInfo: any // it's a big object
}

const LaunchCard: React.FC<LaunchCardType> = ({ id, name, date, patch, launchInfo }) => {
    const authState = useAppSelector((state => state.auth))

    let fDate = date.split('T')[0];
    let ffDate = fDate.split('-');
    let fffDate = ffDate[2] + '-' + ffDate[1] + '-' + ffDate[0]
    
    if(authState.token) {
        return (
            <div className='launchCard'>
                <img src={patch} alt={name}/>
                <p>{name}</p>
                <p>{fffDate}</p>
                <Link to={{
                    pathname: `/pastLaunch/${id}/${authState.userId}`,
                    state: {...launchInfo, fffDate}
                }}>
                    <button>
                        View details
                    </button>
                </Link>
            </div>
        )
    } else {
        return (
            <div className='launchCard'>
                <img src={patch} alt={name}/>
                <p>{name}</p>
                <p>{fffDate}</p>
                <Link to={{
                    pathname: `/pastLaunch/${id}`,
                    state: {...launchInfo, fffDate}
                }}>
                    <button>
                        View details
                    </button>
                </Link>
            </div>
        )
    }
}

export default LaunchCard;