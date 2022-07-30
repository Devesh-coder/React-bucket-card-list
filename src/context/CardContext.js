import { createContext } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useState, useEffect } from 'react'

const CardContext = createContext()

export const CardProvider = ({ children }) => {
	// const [isLoading, setIsLoading] = useState([true])
	const [items, setItems] = useState([
		{
			id: 1,
			title: 'Entertainment Videos',
			cards: [
				{
					rank: 1,
					topic: 'Entertainment video 1',
					link: <a href='www.youtube.com'> Youtube</a>,
				},
				{
					rank: 2,
					topic: 'Entertainment video 2',
					link: <a href='www.youtube.com'> Youtube</a>,
				},
			],
		},
		{
			id: 2,
			title: 'Educational Videos',
			cards: [
				{
					rank: 1,
					topic: 'Creative Vdeo',
					link: <a href='www.youtube.com'> Youtube</a>,
				},
				{
					rank: 2,
					topic: 'Educating Video',
					link: <a href='www.youtube.com'> Youtube</a>,
				},
			],
		},
	])

	// useEffect(() => {
	// 	fetchData()
	// }, [])

	// Fetch Data
	// const fetchData = async () => {
	// 	const response = await fetch('items')
	// 	const data = await response.json()
	// 	setItems(data)
	// 	setIsLoading(false)
	// }

	const [cardEdit, setCardEdit] = useState({
		item: {},
		card: {},
		edit: false,
	})

	const editCard = (item, card) => {
		setCardEdit({
			item,
			card,
			edit: true,
		})
	}

	const updateBucket = (topic) => {
		console.log(topic)
		const updList = items
		updList.map((item) => {
			if (item.title == cardEdit.item.title) {
				item.title = topic
			}
		})
		console.log(updList)
		setItems(updList.filter((item) => item))
	}

	const updateCard = (newCard, bucketTitle, updItem, val) => {
		const updList = items
		if (val == 1) {
			updList.map((item) => {
				if (item.title == bucketTitle) {
					item.cards.map((card) => {
						if (updItem.rank == card.rank) {
							card.topic = updItem.topic
							card.link = updItem.link
						}
					})
				}
				setItems(updList.filter((item) => item))
			})
		} else if (val == 0) {
			updList.map((item) => {
				if (item.title == bucketTitle) {
					deleteCard(cardEdit.item.id, updItem.rank)
					console.log(cardEdit.item.id, ' ', updItem.rank, ' ', editCard)
					addCard(newCard)
				}
			})
		}
		setCardEdit({}, {}, false)
	}

	const deleteCard = (id, rank) => {
		const newList = items
		newList.map((item) => {
			if (item.id === id) {
				item.cards = item.cards.filter((card) => card.rank != rank)
			}
		})
		setItems(newList.filter((item) => item))
		console.log(newList)
	}

	const addCard = (newCard) => {
		const newList = items
		newList.map((item) => {
			if (item.title == newCard.bucket) {
				newCard.card.rank = uuidV4()
				item.cards.push(newCard.card)
			}
		})
		setItems(newList.filter((item) => item))
	}

	return (
		<CardContext.Provider
			value={{
				items,
				deleteCard,
				addCard,
				editCard,
				cardEdit,
				updateCard,
				updateBucket,
				// isLoading,
			}}
		>
			{children}
		</CardContext.Provider>
	)
}

export default CardContext
