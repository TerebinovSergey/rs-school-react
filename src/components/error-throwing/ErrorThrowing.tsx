import { Component } from 'react';

class ErrorThrowing extends Component {
  state = {
    makeMistake: false,
  };

  componentDidUpdate(): void {
    if (this.state.makeMistake) {
      throw new Error('This is a custom error');
    }
  }

  render() {
    return (
      <button
        onClick={() => {
          this.setState({ makeMistake: true });
        }}
      >
        To make a mistake
      </button>
    );
  }
}

export default ErrorThrowing;
