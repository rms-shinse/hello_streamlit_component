import streamlit as st

from streamlit.components.v1 import components

st.title("Streamlit Local Storage Test")

_component_func = components.declare_component(
    # We give the component a simple, descriptive name ("my_component"
    # does not fit this bill, so please choose something better for your
    # own component :)
    "my_component",
    # Pass `url` here to tell Streamlit that the component will be served
    # by the local dev server that you run via `npm run start`.
    # (This is useful while your component is in development.)
    # url="http://localhost:3001",
    path="frontend/build",
)
pass_phrase = _component_func(name="input pass_phrase")
st.write("current_value", pass_phrase)

st.button("GO!", key="go_button")
if pass_phrase:
    st.text("You logined: {}".format(pass_phrase))
