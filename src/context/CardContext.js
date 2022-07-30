import { createContext } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useState } from 'react'

const CardContext = createContext()

export const CardProvider = ({ children }) => {
	const [items, setItems] = useState([
		{
			id: 1,
			title: 'Entertainment Videos',
			cards: [
				{
					rank: 1,
					topic: 'XYZ1',
					link: <a href='https://www.youtube.com'> Youtube</a>,
				},
				{
					rank: 2,
					topic: 'XYZ2',
					link: <a href='https://www.youtube.com'> Youtube</a>,
				},
			],
		},
		{
			id: 2,
			title: 'Educational Videos',
			cards: [
				{
					rank: 1,
					topic: 'EdV 1',
					link: <a href='https://www.youtube.com'> Youtube</a>,
				},
				{
					rank: 2,
					topic: 'Edv 2',
					link: <a href='https://www.youtube.com'> Youtube</a>,
				},
			],
		},
	])

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
			}}
		>
			{children}
		</CardContext.Provider>
	)
}

export default CardContext
