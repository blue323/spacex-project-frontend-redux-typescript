import React from 'react';
import LaunchCard from './LaunchCard';
import './LaunchesList.css';

type LaunchesListType = {
    launches: Array<any> // it's a big object
}


const LaunchesList: React.FC<LaunchesListType> = ({ launches }) => {
    if(!launches) {
        return (
            <h2 className='l'>Something went wrong</h2>
        )
    }

    const launchData = launches.map(launch => 
        <LaunchCard 
            key={launch.id}
            id={launch.id}
            name={launch.name} 
            date={launch.date_utc} 
            patch={launch.links.patch.small}
            launchInfo={launch}
        />)

    return (
        <React.Fragment>
            <div className='launchesList'>
                <div className='launchesListCards'>
                    {launchData}
                </div>
            </div>
        </React.Fragment>
    )
}

export default LaunchesList;

/* launches - 1 launch{
    "fairings": null,
    "links": {
      "patch": {
        "small": "https://images2.imgbox.com/eb/d8/D1Yywp0w_o.png",
        "large": "https://images2.imgbox.com/33/2e/k6VE4iYl_o.png"
      },
      "reddit": {
        "campaign": null,
        "launch": "https://www.reddit.com/r/spacex/comments/xvm76j/rspacex_crew5_launchcoast_docking_discussion_and/",
        "media": null,
        "recovery": null
      },
      "flickr": {
        "small": [],
        "original": []
      },
      "presskit": null,
      "webcast": "https://youtu.be/5EwW8ZkArL4",
      "youtube_id": "5EwW8ZkArL4",
      "article": null,
      "wikipedia": "https://en.wikipedia.org/wiki/SpaceX_Crew-5"
    },
    "static_fire_date_utc": null,
    "static_fire_date_unix": null,
    "net": false,
    "window": null,
    "rocket": {
      "flickr_images": [
        "https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg",
        "https://farm4.staticflickr.com/3955/32915197674_eee74d81bb_b.jpg",
        "https://farm1.staticflickr.com/293/32312415025_6841e30bf1_b.jpg",
        "https://farm1.staticflickr.com/623/23660653516_5b6cb301d1_b.jpg",
        "https://farm6.staticflickr.com/5518/31579784413_d853331601_b.jpg",
        "https://farm1.staticflickr.com/745/32394687645_a9c54a34ef_b.jpg"
      ],
      "name": "Falcon 9",
      "type": "rocket",
      "active": true,
      "stages": 2,
      "boosters": 0,
      "cost_per_launch": 50000000,
      "id": "5e9d0d95eda69973a809d1ec"
    },
    "success": true,
    "failures": [],
    "details": null,
    "crew": [
      {
        "crew": "62dd7196202306255024d13c",
        "role": "Commander"
      },
      {
        "crew": "62dd71c9202306255024d13d",
        "role": "Pilot"
      },
      {
        "crew": "62dd7210202306255024d13e",
        "role": "Mission Specialist 1"
      },
      {
        "crew": "62dd7253202306255024d13f",
        "role": "Mission Specialist 2"
      }
    ],
    "ships": [],
    "capsules": [
      "617c05591bad2c661a6e2909"
    ],
    "payloads": [
      "62dd73ed202306255024d145"
    ],
    "launchpad": "5e9e4502f509094188566f88",
    "flight_number": 187,
    "name": "Crew-5",
    "date_utc": "2022-10-05T16:00:00.000Z",
    "date_unix": 1664985600,
    "date_local": "2022-10-05T12:00:00-04:00",
    "date_precision": "hour",
    "upcoming": false,
    "cores": [
      {
        "core": "633d9da635a71d1d9c66797b",
        "flight": 1,
        "gridfins": true,
        "legs": true,
        "reused": false,
        "landing_attempt": true,
        "landing_success": true,
        "landing_type": "ASDS",
        "landpad": "5e9e3033383ecbb9e534e7cc"
      }
    ],
    "auto_update": true,
    "tbd": false,
    "launch_library_id": "f33d5ece-e825-4cd8-809f-1d4c72a2e0d3",
    "id": "62dd70d5202306255024d139"
  }*/