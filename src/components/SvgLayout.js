import * as React from 'react'
import PropTypes from 'prop-types'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import { styled } from '@mui/system'

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props

  return (
    <svg width="200" height="200" {...other} ref={ref}>
      <rect x="0" y="0" width="200" height="200" fill="rgb(0, 0, 0, 0.5)" />
      <polygon points="0,205 5,5 205,0 200,200" className="bg" />
      <polygon points="0,205 5,5 205,0 200,200" className="borderEffect" />
      <foreignObject x="0" y="0" width="200" height="200">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  )
})

ButtonRoot.propTypes = {
  children: PropTypes.node
}

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${theme.palette.mode === 'light' ? 'rgb(25,118,210)' : 'rgb(144,202,249)'};
  --hover-color: ${
    theme.palette.mode === 'light' ? 'rgba(25,118,210,0.04)' : 'rgba(144,202,249,0.08)'
  };
  --active-color: ${
    theme.palette.mode === 'light' ? 'rgba(25,118,210,0.12)' : 'rgba(144,202,249,0.24)'
  };

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: 0.5;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
    fill: transparent;
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: 2;
    stroke-dasharray: 200 600;
    stroke-dashoffset: 200;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: var(--hover-color);
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: Helvetica, Inter, Arial, sans-serif;
      font-size: 14px;
      font-weight: 200;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`
)

export const SvgLayout = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />
})
