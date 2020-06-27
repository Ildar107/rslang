import React from 'react';

function CloseGameModal() {
  return (
    <div id="modal2" className="modal close-game-modal">
      <p className="modal-head end-modal-head">
        Выход из игры.
      </p>
      <div className="divider"> </div>
      <p className="modal-head">
        Статистика не законченного раунда не будет сохранена.
      </p>
      <div className="divider"> </div>
      <div className="right-align">
        <button
          className="modal-close waves-effect waves-light btn-small"
        >
          Вернуться
        </button>
        <button
          onClick={() => { window.location.href = '#/'; }}
          className="modal-close waves-effect red lighten-2 waves-light btn-small"
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

export default CloseGameModal;
