export type LostDogPost = {
  id: string;
  status: 'lost' | 'found' | 'reunited';
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  color: string;
  size: string;
  weight: string;
  microchipped: boolean;
  collarDescription?: string;
  distinctiveFeatures: string;
  lastSeenDate: string;
  lastSeenLocation: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  lastSeenDescription: string;
  responseToName: boolean;
  responseToWhistle: boolean;
  responseToTreats: boolean;
  images: string[];
  medicalConditions?: string;
  medications?: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
    altPhone?: string;
  };
  reward?: string;
  createdAt: string;
  updatedAt: string;
  sightings: Sighting[];
  shareCount: number;
  viewCount: number;
}

export type Sighting = {
  id: string;
  postId: string;
  date: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  description: string;
  contactInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  image?: string;
  verified: boolean;
  createdAt: string;
}

// Mock data for lost dog posts
export const lostDogPosts: LostDogPost[] = [
  {
    id: "ld1",
    status: "lost",
    name: "Buddy",
    breed: "Labrador Retriever",
    age: "3 years",
    gender: "Male",
    color: "Golden",
    size: "Large",
    weight: "70 lbs",
    microchipped: true,
    collarDescription: "Blue collar with silver tags",
    distinctiveFeatures: "Small scar above right eye, white patch on chest",
    lastSeenDate: "2025-04-15T18:30:00Z",
    lastSeenLocation: {
      address: "Westwood Park",
      city: "Portland",
      state: "OR",
      coordinates: {
        lat: 45.5152,
        lng: -122.6784
      }
    },
    lastSeenDescription: "Slipped off leash during evening walk near the duck pond",
    responseToName: true,
    responseToWhistle: true,
    responseToTreats: true,
    images: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=800&q=80"
    ],
    medicalConditions: "None",
    contactInfo: {
      name: "James Wilson",
      phone: "(503) 555-1234",
      email: "james.wilson@example.com",
      altPhone: "(503) 555-5678"
    },
    reward: "$500",
    createdAt: "2025-04-15T19:45:00Z",
    updatedAt: "2025-04-16T09:20:00Z",
    sightings: [
      {
        id: "s1",
        postId: "ld1",
        date: "2025-04-16T07:15:00Z",
        location: {
          address: "Cedar Hills Crossing",
          city: "Portland",
          state: "OR",
          coordinates: {
            lat: 45.5092,
            lng: -122.8010
          }
        },
        description: "Saw a golden lab matching this description running loose near the shopping center parking lot. Tried to approach but he ran away.",
        contactInfo: {
          name: "Lisa Martinez",
          phone: "(503) 555-9012",
          email: "lisa.m@example.com"
        },
        verified: true,
        createdAt: "2025-04-16T08:30:00Z"
      }
    ],
    shareCount: 78,
    viewCount: 342
  },
  {
    id: "ld2",
    status: "reunited",
    name: "Daisy",
    breed: "Border Collie Mix",
    age: "5 years",
    gender: "Female",
    color: "Black and White",
    size: "Medium",
    weight: "45 lbs",
    microchipped: true,
    collarDescription: "Pink collar with heart-shaped tag",
    distinctiveFeatures: "One blue eye and one brown eye, distinctive border collie markings",
    lastSeenDate: "2025-03-21T14:15:00Z",
    lastSeenLocation: {
      address: "Forest Park Trail",
      city: "Portland",
      state: "OR",
      coordinates: {
        lat: 45.5279,
        lng: -122.7162
      }
    },
    lastSeenDescription: "Got spooked by a bicycle and ran off into the woods during afternoon hike",
    responseToName: true,
    responseToWhistle: false,
    responseToTreats: true,
    images: [
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80"
    ],
    medicalConditions: "Mild hip dysplasia",
    medications: "Joint supplement daily",
    contactInfo: {
      name: "Emma Chen",
      phone: "(503) 555-3456",
      email: "emma.chen@example.com"
    },
    reward: "$300",
    createdAt: "2025-03-21T15:30:00Z",
    updatedAt: "2025-03-24T18:45:00Z",
    sightings: [
      {
        id: "s2",
        postId: "ld2",
        date: "2025-03-22T08:45:00Z",
        location: {
          address: "Leif Erikson Trail",
          city: "Portland",
          state: "OR",
          coordinates: {
            lat: 45.5361,
            lng: -122.7282
          }
        },
        description: "Spotted a border collie that looks like Daisy drinking from a stream near the trail.",
        contactInfo: {
          name: "Ryan Thomas",
          phone: "(503) 555-7890"
        },
        verified: true,
        createdAt: "2025-03-22T09:15:00Z"
      },
      {
        id: "s3",
        postId: "ld2",
        date: "2025-03-23T16:20:00Z",
        location: {
          address: "NW Thurman Street",
          city: "Portland",
          state: "OR",
          coordinates: {
            lat: 45.5354,
            lng: -122.7219
          }
        },
        description: "Found her hiding under my porch, seemed tired but otherwise okay. Was able to check her collar and call the owner.",
        contactInfo: {
          name: "Miguel Sanchez",
          phone: "(503) 555-2468",
          email: "miguel.s@example.com"
        },
        image: "https://images.unsplash.com/photo-1583511655826-05700442976c?auto=format&fit=crop&w=800&q=80",
        verified: true,
        createdAt: "2025-03-23T16:45:00Z"
      }
    ],
    shareCount: 124,
    viewCount: 567
  },
  {
    id: "ld3",
    status: "lost",
    name: "Rocky",
    breed: "German Shepherd",
    age: "2 years",
    gender: "Male",
    color: "Black and Tan",
    size: "Large",
    weight: "85 lbs",
    microchipped: true,
    collarDescription: "Black leather collar with GPS tracker (may be detached)",
    distinctiveFeatures: "Scar on left hind leg, slightly cropped left ear",
    lastSeenDate: "2025-04-10T11:20:00Z",
    lastSeenLocation: {
      address: "Mt. Tabor Park",
      city: "Portland",
      state: "OR",
      coordinates: {
        lat: 45.5119,
        lng: -122.5947
      }
    },
    lastSeenDescription: "Escaped from yard after gate was left open by delivery person",
    responseToName: true,
    responseToWhistle: true, 
    responseToTreats: true,
    images: [
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605897472359-85e4b94d685d?auto=format&fit=crop&w=800&q=80"
    ],
    medicalConditions: "None",
    contactInfo: {
      name: "Daniel Parker",
      phone: "(503) 555-8765",
      email: "d.parker@example.com"
    },
    reward: "$750",
    createdAt: "2025-04-10T12:00:00Z",
    updatedAt: "2025-04-17T10:15:00Z",
    sightings: [
      {
        id: "s4",
        postId: "ld3",
        date: "2025-04-10T15:45:00Z",
        location: {
          address: "SE Hawthorne Blvd",
          city: "Portland",
          state: "OR",
          coordinates: {
            lat: 45.5121,
            lng: -122.6307
          }
        },
        description: "Saw a German Shepherd running east on Hawthorne. Looked distressed and was moving quickly.",
        contactInfo: {
          name: "Olivia Johnson",
          phone: "(503) 555-1122"
        },
        verified: true,
        createdAt: "2025-04-10T16:30:00Z"
      },
      {
        id: "s5",
        postId: "ld3",
        date: "2025-04-12T09:10:00Z",
        location: {
          address: "Laurelhurst Park",
          city: "Portland",
          state: "OR",
          coordinates: {
            lat: 45.5211,
            lng: -122.6255
          }
        },
        description: "German Shepherd matching Rocky's description drinking from the pond. Couldn't get close enough to check collar.",
        contactInfo: {
          name: "Tyler Wu",
          phone: "(503) 555-3344",
          email: "tyler.wu@example.com"
        },
        image: "https://images.unsplash.com/photo-1623780969878-6b2b87a7d089?auto=format&fit=crop&w=800&q=80",
        verified: false,
        createdAt: "2025-04-12T09:45:00Z"
      }
    ],
    shareCount: 215,
    viewCount: 879
  }
];

export const emergencyContacts = [
  {
    name: "Portland Animal Control",
    phone: "(503) 988-7387",
    hours: "24/7 Emergency Line",
    website: "https://www.portland.gov/animalservices"
  },
  {
    name: "Oregon Humane Society",
    phone: "(503) 285-7722",
    hours: "Mon-Sun: 10am-7pm",
    website: "https://oregonhumane.org"
  },
  {
    name: "DoveLewis Emergency Animal Hospital",
    phone: "(503) 228-7281",
    hours: "24/7 Emergency Care",
    website: "https://www.dovelewis.org"
  },
  {
    name: "Trek Snout Lost Dog Hotline",
    phone: "(503) 555-DOGS",
    hours: "24/7 Volunteer Network",
    website: "#"
  }
];

export const shelterContacts = [
  {
    name: "Multnomah County Animal Services",
    phone: "(503) 988-7387",
    address: "1700 W Historic Columbia River Hwy, Troutdale, OR",
    website: "https://www.multcopets.org"
  },
  {
    name: "Family Dogs New Life Shelter",
    phone: "(503) 771-5596",
    address: "9101 SE Stanley Ave, Portland, OR",
    website: "https://www.familydogsnewlife.org"
  },
  {
    name: "Pixie Project",
    phone: "(503) 542-3432",
    address: "510 NE Martin Luther King Jr Blvd, Portland, OR",
    website: "https://www.pixieproject.org"
  }
];

export const petSearchers = [
  {
    name: "Portland Pet Detectives",
    phone: "(503) 555-7890",
    specialties: "Tracking dogs, drone searches, thermal imaging",
    website: "https://www.example.com/petdetectives"
  },
  {
    name: "Pacific NW Search & Rescue K9 Team",
    phone: "(503) 555-4321",
    specialties: "K9 tracking, wilderness searches, scent detection",
    website: "https://www.example.com/searchk9"
  }
];