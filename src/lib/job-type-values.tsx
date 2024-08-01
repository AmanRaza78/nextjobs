interface jobTypeValuesProps {
    name: string;
    title: string;
    id: number;
  }
  
  export const JobTypeValues: jobTypeValuesProps[] = [
    {
      id: 0,
      name: "REMOTE",
      title: "Remote",
    },
    {
      id: 1,
      name: "OFFSITE",
      title: "Offsite",
    },
    {
        id: 2,
        name: "HYBRID",
        title: "Hybrid",
      },
  ];
  