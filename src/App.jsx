import React, { useState } from 'react'
import LogoLD from './components/LogoLD'
import PassCode from './components/PassCode/PassCode';

const App = () => {
	
	const [openPassCode, setOpenPassCode] = useState(false);
	const [count, setCount] = useState(0);

	const setSuccess = () => {
		setCount(count + 1);
		setOpenPassCode(false);
	}

	return <> { 
		!openPassCode ? <div className='container py-4'>
			<div className='row py-4'>
				<div className='col-6 col-lg-2 offset-3 offset-lg-5'>
					<LogoLD />
				</div>
			</div>
			<div className='row py-4'>
				<div className='col text-center'>
					<button
						className='btn btn-primary'
						onClick={ () => setOpenPassCode(true) }
					>Autenticación</button>
				</div>
			</div>
			<p className='text-center'>Conteo: {count}</p>
		</div> : <PassCode triggerSuccess={ setSuccess } triggerClose={ () => setOpenPassCode(false) } />
		}
	</>
}

export default App