import { Component } from 'react';

interface TitleProps {
  title: string;
}

class Title extends Component<TitleProps> {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

export default Title;
