const styles = {
    color: '#aeaeae',
    width: '5rem',
    borderRadius: '2rem',
    backgroundColor: 'black',
    textAlign: 'center',
}

// colocando uma tipagem no props
interface ButtonTestProps {
    title: string;
}

export function ButtonTest(props) {
    return (
        <p style={styles}>
            {props.title}
        </p>
    )
}