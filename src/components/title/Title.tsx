interface PropsType {
  title: string;
}

function Title({ title }: PropsType) {
  return <h1>{title}</h1>;
}

export default Title;
