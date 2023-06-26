import React, { ReactNode } from "react"
import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

interface State {
  currentValue: string
  isFocused: boolean
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class MyComponent extends StreamlitComponentBase<State> {
  public state = { currentValue: "", isFocused: false }

  public render = (): ReactNode => {
    const name = this.props.args["name"]
    const lastValue = localStorage.getItem(`hello_streamlit_component:${name}`)
    if (lastValue) {
      this.setState(
        (prevState) => ({ ...prevState, currentValue: lastValue }),
        () => Streamlit.setComponentValue(this.state.currentValue)
      )
    }

    const { theme } = this.props
    const style: React.CSSProperties = {}

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.
      const borderStyling = `1px solid ${
        this.state.isFocused ? theme.primaryColor : "gray"
      }`
      style.border = borderStyling
      style.outline = borderStyling
    }

    const handleChange = (anEvent: string): void => {
      this.setState(
        (prevState) => ({ ...prevState, currentValue: anEvent }),
        () => {
          localStorage.setItem(
            `hello_streamlit_component:${name}`,
            this.state.currentValue
          )

          Streamlit.setComponentValue(this.state.currentValue)
        }
      )
    }

    const handleFocus = (): void => {
      this.setState({ isFocused: true })
    }

    const handleBlur = (): void => {
      this.setState({ isFocused: false })
    }

    return (
      <span>
        {name}
        <input
          type="password"
          style={style}
          value={this.state.currentValue}
          onChange={(e) => handleChange(e.target.value)}
          disabled={this.props.disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
      </span>
    )
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent)
