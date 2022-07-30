import React from 'react'
import BucketItem from './BucketItem'
import { useContext } from 'react'
import CardContext from '../context/CardContext'

function BucketList() {
	const { items, isLoading } = useContext(CardContext)

	if (!isLoading && !items && items.length === 0) {
		return <p>No List item</p>
	}

	return isLoading ? (
		<h3>Loading ...</h3>
	) : (
		<div>
			{items.map((item) => (
				<BucketItem key={item.id} item={item} />
			))}
		</div>
	)
}

export default BucketList
