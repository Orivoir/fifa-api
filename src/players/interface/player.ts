export default interface Player {
  id: number; // uniq player id use for build player image URL
  height: number; // centimeters
  weight: number; // kilograms
  preferredFoot: "Right" | "Left";
  bornAt?: number; // timestamp ms
  age?: number;
  fullName: string; // format: "firstName lastName"
  countryId: number; // uniq country id use for build country flag image URL

  countryName: string; // original country name
  rangeRank: [number, number]; // rank player between [| 0,100 |]

  // set of favorites player positions
  preferredPositions: ("GK" |
    "RB" |
    "RWB" |
    "LB" |
    "LWB" |
    "CB" |
    "CDM" |
    "CM" |
    "CAM" |
    "LM" |
    "LW" |
    "LF" |
    "RM" |
    "RW" |
    "RF" |
    "CF" |
    "ST")[];

  clubId: number; // uniq club id use or build club logo image
  clubName: string; // original club name

  // club team required
  // national team optional (only if selected)
  teams: {
      id: number; // club id (same of clubId if not national team)
      name: string; // club name (same of clubName if not national team)
      kitNumber: number;
      joinedClub?: number; // timestamp ms
    }[],

  // player stats
  skills: {
    defence: {
      standTackle: number;
      slideTackle: number;
      marking: number;
    };
    mental: {
      composure: number;
      vision: number;
      interceptions: number;
      attackPosition: number;
      reactions: number;
      aggression: number;
    };
    physical: {
      jumping: number;
      agility: number;
      sprintSpeed: number;
      balance: number;
      strength: number;
      stamina: number;
      acceleration: number;
    };
    passing: {
      longPass: number;
      shortPass: number;
      crossing: number;
    };
    goalkeeper: {
      reflexes: number;
      kicking: number;
      handling: number;
      diving: number;
      positioning: number;
    };
    shooting: {
      volleys: number;
      penalties: number;
      freeKickAccuracy: number;
      curve: number;
      longShot: number;
      finishing: number;
      shotPower: number;
      heading: number;
    };
    ballskills: {
      ballControl: number;
      dribbling: number;
    }
  }
}
