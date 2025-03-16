interface CheckData {
	data: {
		verify_token: string
	}
	success: boolean
}

interface ClientChannels {
	description: string
	image_url: string
	is_active: boolean
	link: string
	name: string
	sorting: number
	timeout: number
	type: string
}

interface CreateData {
	data: {
		client_channels: ClientChannels[]
		description: string
		image_url: string
		is_active: boolean
		link: string
		name: string
		session_id: string
		sorting: number
		timeout: number
		type: string
	}
	success: boolean
}

interface SelectItem {
	code: string
	dial_code?: string
	flag: string
	name: string
}

interface SendData {
	data: {
		client_channels: string[]
		description: string
		image_url: string
		is_active: boolean
		link: string
		name: string
		session_id: string
		sorting: number
		timeout: number
		type: string
	}
	success: boolean
}
