import React, {Component} from 'react';
import Step from './Step';
import data from '../public/input'

export default class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 0,
            answers: {},
            validation: false,
            response: {},
        }
    }

    handleChange = (e) => {
        const {name, value, type} = e.target;
        const itemId = name;
        const text = value;
        let {answers} = this.state;

        if (Object.keys(answers).indexOf(itemId) === -1) {
            answers[itemId] = [text]
        } else {
            if (type === "checkbox") {
                if (answers[itemId].includes(text)) {
                    // check if already in
                    answers[itemId] = answers[itemId].filter((v) => {
                        return v !== text
                    })
                } else {
                    answers[itemId].push(text);
                }
            } else {
                answers[itemId] = [text]
            }
        }
        this.setState({
            answers: answers,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {answers} = this.state;
        let isValid = this.isValid();
        if (isValid) {
            let items = Object.keys(answers).map((id) => {
                return {
                    id: id,
                    answer: answers[id].join(', ')
                }
            })

            let response = {
                id: data.formId,
                items: items
            }
            this.setState({response: response}, () => console.log('output.json',this.state.response))
        }
    }
    isValid = () => {
        let {currentStep, answers} = this.state;
        const step = data.items[currentStep];
        if (!answers[step.itemId]) {
            alert('값을 입력하지 않으셨습니다.');
            return false;
        }
        return true;
    }

    _next = () => {
        let {currentStep} = this.state;
        let isValid = this.isValid();
        if (isValid) {
            currentStep = currentStep >= 2 ? 3 : currentStep + 1;
            this.setState({
                currentStep: currentStep
            })
        }
    }

    _prev = () => {
        let {currentStep} = this.state;
        currentStep = currentStep <= 0 ? 0 : currentStep - 1;
        this.setState({
            currentStep: currentStep
        })
    }

    previousButton = () => {
        let {currentStep} = this.state;
        if (currentStep !== 0) {
            return (
                <button
                    type="button"
                    onClick={this._prev}>
                    Previous
                </button>
            )
        }
        return null;
    }

    nextButton = () => {
        let {currentStep} = this.state;
        if (currentStep < 3) {
            return (
                <button
                    type="button"
                    onClick={this._next}>
                    Next
                </button>
            )
        }
        if (currentStep === 3) {
            return (
                <input type="submit" value="Submit"/>
            )
        }
        return null;
    }

    render() {
        const {currentStep} = this.state;
        const step = data.items[currentStep];

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className='formWrapper'>
                        <Step step={step}
                              handleChange={this.handleChange}/>
                        <div className='btnWrapper'>
                            {this.previousButton()}
                            {this.nextButton()}
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

