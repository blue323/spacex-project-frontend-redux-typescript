export const past: {
  query: {
      upcoming: boolean;
  };
  options: {
      sort: {
          flight_number: string;
      };
      limit: number;
      populate: {
          path: string;
          select: {
              flickr_images: number;
              name: number;
              type: number;
              active: number;
              stages: number;
              boosters: number;
              cost_per_launch: number;
              success_rate_ptc: number;
              first_fligth: number;
          };
      }[];
  };
} = {
    "query": {
      "upcoming": false
    },
    "options": {
      "sort": {
        "flight_number":"desc"
      },
      "limit": 500,
      "populate": [
        {
          "path": "rocket",
          "select": {
            "flickr_images": 1,
            "name": 1,
            "type": 1,
            "active": 1,
            "stages": 1,
            "boosters": 1,
            "cost_per_launch": 1,
            "success_rate_ptc": 1,
            "first_fligth": 1
          }
        }
      ]
    }
}