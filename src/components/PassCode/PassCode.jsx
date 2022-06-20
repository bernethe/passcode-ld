import React, { useEffect, useRef, useState } from 'react'
import PassCodePadlock from './PassCodePadlock';
import './passcode.scss'

const PassCode = ({triggerSuccess, triggerClose}) => {

	const refIcon = useRef(null);
	const [userCode, setUserCode] = useState(0);

	let timer;

	const nextInput = (e) => {
		const input = e.target;

		if (input.value.match(/^[0-9]+$/) && input.value.length === 1) {
			input.nextElementSibling.value = '';
			input.nextElementSibling.focus();
		} else if(input.value.length > 1) {
			input.value = '';
			input.focus();
		}
		getUserCode();
	}

	const focusInput = (e) => {
		e.target.value = '';
	}

	const pasteInput = (e) => {
		e.preventDefault();
		let inputCount = 0;
		let currentInput = e.target;
		let pastedValue = e.clipboardData.getData('text');

		while (inputCount < pastedValue.length) {
			let _currentValue = pastedValue[inputCount];
			if (!isNaN(Number(_currentValue))) {
				currentInput.value = _currentValue;
				currentInput = currentInput.nextElementSibling;
				// console.log(currentInput);
				if (currentInput) {
					currentInput.focus();
					inputCount++;
				} else {
					break;
				}
			}
		}
		getUserCode();
	}

	const getUserCode = () => {
		refIcon.current.classList.remove('ld-passcode-icon-right-anim');
		refIcon.current.classList.remove('ld-passcode-icon-wrong-anim');

		let tempCode = '';

		document.querySelectorAll('.ld-passcode-inputs input').forEach(input => {
			tempCode += input.value;
		})
		// console.log(tempCode.toString().length);

		if(tempCode.toString().length === 6){
			if(Number(tempCode) === 123456) {
				refIcon.current.classList.add('ld-passcode-icon-right-anim');
				timer = setTimeout(() => {
					triggerSuccess();
					clearTimeout(timer);
				}, 1500);
			} else {
				refIcon.current.classList.add('ld-passcode-icon-wrong-anim');
				document.querySelectorAll('.ld-passcode-inputs input').forEach(input => input.value = '');
				document.querySelector('.ld-passcode-inputs input').focus();
			}
		}
		setUserCode(Number(tempCode));
	}

	return <div className='ld-passcode'>
		<div className='ld-passcode-backdrop'></div>
		<div className='ld-passcode-container'>
			<div className='ld-passcode-window'>
				<button className='ld-passcode-close-btn' onClick={triggerClose}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12,12-5.37,12-12S18.63,0,12,0Zm5.3,15.18c.59,.59,.59,1.54,0,2.12-.59,.59-1.54,.59-2.12,0l-3.18-3.18-3.18,3.18c-.59,.59-1.54,.59-2.12,0-.59-.59-.59-1.54,0-2.12l3.18-3.18-3.18-3.18c-.59-.59-.59-1.54,0-2.12s1.54-.59,2.12,0l3.18,3.18,3.18-3.18c.59-.59,1.54-.59,2.12,0s.59,1.54,0,2.12l-3.18,3.18,3.18,3.18Z'/></svg>
				</button>
				<div className='ld-passcode-icon' ref={refIcon}>
					<PassCodePadlock />
				</div>
				<p>Ingrese el código de autenticación que se le ha enviado por email o SMS.</p>
				<div className='ld-passcode-inputs'>
					<input type='number' min={0} max={9} maxLength={1} autoComplete='off' pattern='[0-9]*' onFocus={focusInput} onChange={nextInput} onPaste={pasteInput} autoFocus={true} />
					<input type='number' min={0} max={9} maxLength={1} autoComplete='off' pattern='[0-9]*' onFocus={focusInput} onChange={nextInput} />
					<input type='number' min={0} max={9} maxLength={1} autoComplete='off' pattern='[0-9]*' onFocus={focusInput} onChange={nextInput} />
					<input type='number' min={0} max={9} maxLength={1} autoComplete='off' pattern='[0-9]*' onFocus={focusInput} onChange={nextInput} />
					<input type='number' min={0} max={9} maxLength={1} autoComplete='off' pattern='[0-9]*' onFocus={focusInput} onChange={nextInput} />
					<input type='number' min={0} max={9} maxLength={1} autoComplete='off' pattern='[0-9]*' onFocus={focusInput} onChange={getUserCode} />
				</div>
				<div className='ld-passcode-faq'>
					<a href='#/'>¿No recibes el código?</a>
				</div>
			</div>
		</div>
	</div>
}

export default PassCode