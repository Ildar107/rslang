import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 0;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  height: '40px',
  padding: grid,
  overflow: 'auto',
  width: '100%',
});

class DragNdrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: [],
      droppable: 'items',
      droppable2: 'selected',
      width: 0,
      sentences: null,
      numOfSentence: 0,
      numOfChars: 0,
      src: null,
    };
    this.getList = this.getList.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.getItemStyle = this.getItemStyle.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.setWidth = this.setWidth.bind(this);
    this.getListStyle2 = this.getListStyle2.bind(this);
    this.setItems = this.setItems.bind(this);
    this.setNumOfChars = this.setNumOfChars.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.getItemStyleSelected = this.getItemStyleSelected.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.setRightSentence = this.setRightSentence.bind(this);
    this.getBackground = this.getBackground.bind(this);
    this.getBackgroundSize = this.getBackgroundSize.bind(this);
  }

  setRightSentence(number) {
    if (this.state.sentences) {
      const sentArr = this.state.sentences[number].split(' ');
      const selected = sentArr.map((item, num) => ({
        id: `${num}`,
        content: `${item}`,
      }));
      return selected;
    }
    return null;
  }

  checkResult() {
    const sentenceArr = this.state.selected.map((it) => it.content);
    if (this.state.sentences
        && sentenceArr.join(' ') === this.state.sentences[this.state.numOfSentence]) return true;
    return false;
  }

  getListStyle2(isDraggingOver) {
    return {
      background: isDraggingOver ? 'lightblue' : 'lightgrey',
      display: 'flex',
      height: '40px',
      padding: grid,
      overflow: 'auto',
      width: '100%',
      top: `${this.state.numOfSentence * 40}px`,
    };
  }

  setWidth() {
    this.setState({
      width: window.getComputedStyle(document.querySelector('.drop2'))
        .width.split('px')[0],
    });
  }

  setItems(sentence, number) {
    if (sentence) {
      const sentArr = sentence[number].split(' ');
      const items = sentArr.map((item, num) => ({
        id: `${num}`,
        content: `${item}`,
      }));
      items.sort(() => (Math.random() - 0.5));
      return items;
    }
    return null;
  }

  setNumOfChars(sentence, number) {
    if (sentence) {
      return sentence[number]
        .replace(/\s/g, '').length;
    }
    return null;
  }

  componentDidMount() {
    this.setWidth();
    window.addEventListener('resize', this.setWidth);
  }

  componentDidUpdate(prevProps) {
    if (this.props.wordsData !== prevProps.wordsData) {
      const sent = this.props.wordsData.map((it) => it.textExample);
      this.props.setButtons(true);
      this.setState({ sentences: sent });
      this.setState({ numOfSentence: 0 });
      this.props.setNumOfSentence(0);
      this.setState({ numOfChars: this.setNumOfChars(sent, 0) });
      this.setState({ items: this.setItems(sent, 0) });
      this.setState({ selected: [] });
      const img = new Image();
      img.src = this.props.wordsData[0].background;
      img.onload = () => {
        this.setState({ src: this.props.wordsData[0].background });
        this.setState({ imgHeight: img.height });
        this.setState({ imgWidth: img.width });
      };
      this.props.setArrayOfMistakes([]);
    }
    if (!this.state.items.length && this.state.selected.length
        && !this.props.allInSelected) this.props.setAllInSelected(true);

    if (!prevProps.check && this.props.check
        && !this.checkResult() && !this.props.dontKnow) {
      const arr = this.props.arrayOfMistakes;
      arr.push(this.state.numOfSentence);
      this.props.setArrayOfMistakes(arr);
    }
    if (!this.state.items.length && this.state.selected.length
        && this.props.check && this.checkResult() && !this.props.win) {
      this.props.setWin(true);
    }
    if (!prevProps.dontKnow && this.props.dontKnow) {
      this.setState({ items: [] });
      this.setState({ selected: this.setRightSentence(this.state.numOfSentence) });
      const arr = this.props.arrayOfMistakes;
      if (arr.length && arr[arr.length - 1] === this.state.numOfSentence) arr.pop();
      arr.push(this.state.numOfSentence + 100);
      this.props.setArrayOfMistakes(arr);
    }
    if (!prevProps.continuer && this.props.continuer && this.state.numOfSentence < 9) {
      this.props.setAllInSelected(false);
      this.props.setWin(false);
      this.props.setNumOfSentence(this.state.numOfSentence + 1);
      this.setState({
        numOfChars:
            this.setNumOfChars(this.state.sentences, this.state.numOfSentence + 1),
      });
      this.setState({ items: this.setItems(this.state.sentences, this.state.numOfSentence + 1) });
      this.setState({ selected: [] });
      this.setState({ numOfSentence: this.state.numOfSentence + 1 });
      this.props.setContinue(false);
    }
    if (!prevProps.continuer && this.props.continuer && this.state.numOfSentence === 9
        && !this.props.next) {
      this.props.setNext(true);
    }
    if (prevProps.next && !this.props.next) {
      this.props.setAllInSelected(false);
      this.props.setWin(false);
      this.props.setNumOfSentence(0);
      this.setState({ numOfChars: 0 });
      this.setState({ items: [] });
      this.setState({ selected: [] });
      this.setState({ numOfSentence: 0 });
      this.props.setContinue(false);
      this.props.setButtons(false);
      this.props.nextPage();
    }
  }

  clickHandler(index) {
    const sourceClone = Array.from(this.state.items);
    const destClone = Array.from(this.state.selected);
    const [removed] = sourceClone.splice(index, 1);
    destClone.splice(destClone.length, 0, removed);
    this.setState({ items: sourceClone });
    this.setState({ selected: destClone });
  }

  getList(id) { return this.state[this.state[id]]; }

  getBackground(index) {
    const kImage = this.state.imgWidth / this.state.imgHeight;
    const kField = this.state.width / 400;
    let x;
    let y;
    if (kImage <= kField) {
      const offsetY = (((this.state.width / this.state.imgWidth) * this.state.imgHeight)
            - 400) / 2;
      y = (offsetY + this.state.numOfSentence * 40) * -1;
      const arrOfWords = this.state.sentences ? this.state.sentences[this.state.numOfSentence].split(' ') : [];
      let wordsLength = 0;
      for (let i = 0; i < index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((this.state.width / this.state.numOfChars) * wordsLength) * -1;
    } else {
      const offsetX = (((400 / this.state.imgHeight) * this.state.imgWidth)
            - this.state.width) / 2;
      y = this.state.numOfSentence * -40;
      const arrOfWords = this.state.sentences[this.state.numOfSentence].split(' ');
      let wordsLength = 0;
      for (let i = 0; i < index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((this.state.width / this.state.numOfChars) * wordsLength + offsetX) * -1;
    }
    return { x, y };
  }

  getBackgroundSize() {
    const kImage = this.state.imgWidth / this.state.imgHeight;
    const kField = this.state.width / 400;
    if (kImage <= kField) return `${this.state.width}px auto`;
    return 'auto 400px';
  }

  getItemStyle(item, isDragging, draggableStyle) {
    const widthToOneChar = this.state.width / this.state.numOfChars;
    const curWidth = item.content.length * widthToOneChar;
    const styleObg = {
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      textShadow: 'black 0 0 4px',
      border: '1px solid white',
      color: 'white',
      textAlign: 'center',
      userSelect: 'none',
      padding: '0',
      margin: '0',
      width: `${curWidth}px`,
      ...draggableStyle,
    };
    if (!this.props.backgroundPrompt) styleObg.background = isDragging ? 'lightgreen' : 'blue';
    else {
      styleObg.backgroundImage = `url(${this.state.src})`;
      styleObg.backgroundSize = this.getBackgroundSize();
      styleObg.backgroundPosition = `${this.getBackground(+item.id).x}px ${this.getBackground(+item.id).y}px`;
    }

    return styleObg;
  }

  getItemStyleSelected(index, item, isDragging, draggableStyle, check) {
    const widthToOneChar = this.state.width / this.state.numOfChars;
    const curWidth = item.content.length * widthToOneChar;
    let color = null;
    if (check && this.state.sentences) {
      color = index === +item.id ? 'green' : 'red';
      const sentenceArr = this.state.sentences[this.state.numOfSentence].split(' ');
      if (sentenceArr[index] === item.content) color = 'green';
    }
    const styleObg = {
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      textShadow: 'black 0 0 4px',
      border: '1px solid white',
      color: 'white',
      textAlign: 'center',
      userSelect: 'none',
      padding: '0',
      margin: '0',
      width: `${curWidth}px`,

      ...draggableStyle,
    };
    if (color) styleObg.background = color;
    else if (!this.props.backgroundPrompt) styleObg.background = isDragging ? 'lightgreen' : 'blue';
    else {
      styleObg.backgroundImage = `url(${this.state.src})`;
      styleObg.backgroundSize = this.getBackgroundSize();
      styleObg.backgroundPosition = `${this.getBackground(+item.id).x}px ${this.getBackground(+item.id).y}px`;
    }

    return styleObg;
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index,
      );
      let state = { items };
      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }
      this.setState(state);
    } else {
      const result1 = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );
      this.setState({
        items: result1.droppable,
        selected: result1.droppable2,
      });
    }
  }

  render() {
    return (
      <div>
        {!this.props.next && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className="drop"
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided1, snapshot1) => (
                        // eslint-disable-next-line max-len
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                        <div
                          onClick={() => this.clickHandler(index)}
                          ref={provided1.innerRef}
                          {...provided1.draggableProps}
                          {...provided1.dragHandleProps}
                          style={this.getItemStyle(
                            item,
                            snapshot1.isDragging,
                            provided1.draggableProps.style,
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className="drop2"
                  ref={provided.innerRef}
                  style={this.getListStyle2(snapshot.isDraggingOver)}
                >
                  {this.state.selected.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided1, snapshot1) => (
                        <div
                          ref={provided1.innerRef}
                          {...provided1.draggableProps}
                          {...provided1.dragHandleProps}
                          style={this.getItemStyleSelected(
                            index,
                            item,
                            snapshot1.isDragging,
                            provided1.draggableProps.style,
                            this.props.check,
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    );
  }
}

DragNdrop.propTypes = {
  wordsData: PropTypes.isRequired,
  setAllInSelected: PropTypes.func.isRequired,
  allInSelected: PropTypes.bool.isRequired,
  check: PropTypes.bool.isRequired,
  setCheck: PropTypes.func.isRequired,
  setWin: PropTypes.func.isRequired,
  win: PropTypes.bool.isRequired,
  dontKnow: PropTypes.bool.isRequired,
  continuer: PropTypes.bool.isRequired,
  setContinue: PropTypes.func.isRequired,
  setNumOfSentence: PropTypes.func.isRequired,
  setButtons: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setNext: PropTypes.func.isRequired,
  next: PropTypes.bool.isRequired,
  backgroundPrompt: PropTypes.bool.isRequired,
  setArrayOfMistakes: PropTypes.func.isRequired,
  arrayOfMistakes: PropTypes.isRequired,
};

export default DragNdrop;
