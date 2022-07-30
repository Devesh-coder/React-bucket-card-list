import { useState } from 'react'
import BucketList from './components/BucketList'
import CardForm from './components/CardForm'
import { CardProvider } from './context/CardContext'

function App() {
	return (
		<CardProvider>
			<div>
				<CardForm />
				<BucketList />
			</div>
		</CardProvider>
	)
}

export default App
