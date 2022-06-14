import classNames from 'classnames';

export default function Button(props) {
  let buttonClass = classNames('nes-btn', { 'is-primary': props.primary }, { 'is-success': props.success }, { 'is-warning': props.warning }, { 'is-error': props.error });

  return (
    <button onClick={props.onClick} className={buttonClass}>
      {props.children}
    </button>
  );
}
