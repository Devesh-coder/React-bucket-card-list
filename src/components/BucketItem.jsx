import React from 'react'
import CardItem from './CardItem'
import { FaEdit } from 'react-icons/fa'
import { useContext } from 'react'
import CardContext from '../context/CardContext'

function BucketItem({ item }) {
	const { editCard } = useContext(CardContext)

	return (
		<>
			<div className='bucket'>
				<header className='bucket-header'>
					<h2>{item.title}</h2>
					<button onClick={() => editCard(item, null)} className='edit'>
						<FaEdit color='blue' className='header-edit' />
					</button>
				</header>
				{item.cards.map((card) => (
					<CardItem key={card.rank} item={item} card={card} />
				))}
			</div>
		</>
	)
}

export default BucketItem
