import React from 'react'
import Card from './shared/Card'
import { FaTimes, FaEdit } from 'react-icons/fa'
import { useContext } from 'react'
import CardContext from '../context/CardContext'

function CardItem({ card, item }) {
	const { deleteCard, editCard } = useContext(CardContext)
	return (
		<Card>
			<div className='card-detail'>
				<p className='card-topic'>{card.topic}</p>
				<p className='link'> {card.link}</p>
			</div>
			<button className='close' onClick={() => deleteCard(item.id, card.rank)}>
				<FaTimes color='blue' />
			</button>

			<button className='edit' onClick={() => editCard(item, card)}>
				<FaEdit color='blue' />
			</button>
		</Card>
	)
}

export default CardItem
