// https://codesandbox.io/s/react-typewriter-effect-rdis2?file=/components/Typewriter.js:0-1341

import React from 'react'
import './Style.css'

class TypeWriter extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			text: '',
		}

		this.tick = this.tick.bind(this)
	}

	componentDidMount() {
		this.unmounted = false
		this.loopNum = 0
		this.period = 4000
		this.isDeleting = false
		this.tick()
	}

	componentWillUnmount() {
		this.unmounted = true
	}

	tick() {
		if (this.unmounted) {
			return
		}

		const { data: toRotate } = this.props
		const i = this.loopNum % toRotate.length
		const fullTxt = toRotate[i]

		let newText = ''
		if (this.isDeleting) {
			newText = fullTxt.substring(0, this.state.text.length - 1)
		} else {
			newText = fullTxt.substring(0, this.state.text.length + 1)
		}

		let delta = 200 - Math.random() * 80

		if (this.isDeleting) {
			delta /= 2
		}

		if (!this.isDeleting && newText === fullTxt) {
			delta = this.period
			this.isDeleting = true
		} else if (this.isDeleting && newText === '') {
			this.isDeleting = false
			this.loopNum++
			delta = 500
		}

		this.setState({ text: newText })

		setTimeout(() => {
			this.tick()
		}, delta)
	}

	render() {
		const { isDarkMode } = this.props
		const cursorColor = isDarkMode ? 'white' : '#333'

		return (
			<span className='typewriter'>
				{this.state.text}
				<span
					className='blinking-cursor'
					style={{ animation: `blinkCursor 1s infinite`, color: cursorColor }}
				>
					&nbsp;|
				</span>
			</span>
		)
	}
}

export default TypeWriter
