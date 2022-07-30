import React from 'react'
import { useState } from 'react'
import { useContext, useEffect } from 'react'
import CardContext from '../context/CardContext'

function CardForm() {
	const [bucket, setBucket] = useState('')
	const [topic, setTopic] = useState('')
	const [link, setLink] = useState('')
	const [rank, setRank] = useState('')

	const { addCard, cardEdit, updateCard, updateBucket } = useContext(CardContext)

	useEffect(() => {
		if (cardEdit.edit == true) {
			if (cardEdit.card != null) {
				setBucket(cardEdit.item.title)
				setTopic(cardEdit.card.topic)
				setLink(cardEdit.card.link)
				setRank(cardEdit.card.rank)
				// console.log(e.target)
			} else {
				setBucket(cardEdit.item.title)
				setLink('')
				setTopic('')
			}
		}
	}, [cardEdit])

	const handleTopicChange = (e) => {
		setTopic(e.target.value)
	}

	const handleLinkChange = (e) => {
		setLink(e.target.value)
	}

	const handleBucketChange = (e) => {
		setBucket(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const newCard = {
			bucket,
			card: {
				rank,
				topic,
				link,
			},
		}

		if (cardEdit.edit == true) {
			if (cardEdit.card != null) {
				if (cardEdit.item.title == newCard.bucket) {
					updateCard(newCard, newCard.bucket, newCard.card, 1)
				} else {
					updateCard(newCard, newCard.bucket, newCard.card, 0)
				}
			} else {
				updateBucket(newCard.bucket)
				console.log(newCard.bucket)
			}
		} else {
			addCard(newCard)
		}
		setLink('')
		setTopic('')
		setBucket('')
	}

	return (
		<div className='bucket'>
			<h2 className='overall-topic'>Bucket and Card List</h2>
			<form onSubmit={handleSubmit}>
				<div className='form'>
					<div className='form-data'>
						<label htmlFor='bucket-name'>Bucket Name : </label>
						<input
							onChange={handleBucketChange}
							type='text'
							id='bucket-name'
							placeholder='Bucket name'
							value={bucket}
						/>
					</div>

					<div className='form-data'>
						<label htmlFor='card-name'>Card Name : </label>
						<input
							onChange={handleTopicChange}
							type='text'
							id='card-name'
							placeholder='Write card name'
							value={topic}
						/>
					</div>

					<div className='form-data'>
						<label htmlFor='link-name'>Link Name : </label>
						<input
							onChange={handleLinkChange}
							type='text'
							placeholder='Write link'
							id='link-name'
							value={link}
						/>
					</div>

					<button className='form-submit' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default CardForm
