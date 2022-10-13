export const TOGGLE_CONTRACT_ADDRESS = '0x4e398ec4b2BE8F8f1232FE048f343858eB5049D9';
export const TOGGLE_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "changeToggle",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "status",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]