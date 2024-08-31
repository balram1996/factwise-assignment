export interface UserProfile {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

/*
{
		"id": 1,
		"first": "Aidan",
		"last": "Wang",
		"dob": "1973-10-16",
		"gender": "male",
		"email": "aidan.wang@example.com",
		"picture": "https://randomuser.me/api/portraits/med/men/93.jpg",
		"country": "New Zealand",
		"description": "This character description generator will generate a fairly random description of a belonging to Aidan Wang. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details of Aidan Wang."
	},

*/
