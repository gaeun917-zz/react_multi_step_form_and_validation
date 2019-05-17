import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class Step extends Component {
    render() {
        let {step, handleChange} = this.props;
        let form;

        switch (step.formType) {
            case 1:
                form = (
                    <React.Fragment>
                        {step.options.map((o, i) => {
                            return (
                                <label key={o.id}>
                                    <input
                                        type="checkbox"
                                        name={step.itemId}
                                        value={o.text}
                                        onChange={handleChange}
                                    />{o.text}</label>
                            )
                        })}
                    </React.Fragment>
                )
                break;

            case 2:
                form = (
                    <React.Fragment>
                        {step.options.map((o, i) => {
                            return (
                                <label key={o.id}>
                                    <input
                                        type="radio"
                                        name={step.itemId}
                                        value={o.text}
                                        onChange={handleChange}
                                    />
                                    {o.text}
                                </label>
                            )
                        })}
                    </React.Fragment>
                )
                break;

            case 3:
                form = (
                    <input
                        type="text"
                        name={step.itemId}
                        onChange={handleChange}
                        placeholder="ex. 창틀 꼼꼼히 청소해주세요"
                    />
                )
                break;

            case 4:
                form = (
                    <select name={step.itemId}
                            onChange={handleChange}>
                        {step.options.map((o) => {
                            return (
                                <option
                                    key={o.id}
                                    value={o.text}>{o.text}</option>)
                        })}
                    </select>
                )
                break
        }

        return (
            <div className="form-group">
                <h1>️{step.title}</h1>
                <div className='listWrapper'>
                    {form}
                </div>
            </div>
        );
    }
}

Step.propTypes = {
    step: PropTypes.object,
    handleChange: PropTypes.func,
};