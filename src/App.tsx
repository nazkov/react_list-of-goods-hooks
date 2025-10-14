import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortType = 'alphabet' | 'length' | '';

const getSortedGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean
): string[] => {
  const sortedGoods = [...goods];

  switch (sortType) {
    case 'alphabet':
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case 'length':
      sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortType>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedGoods = getSortedGoods(goodsFromServer, activeSort, isReversed);

  const applySort = (type: SortType) => {
    setActiveSort(type);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setActiveSort('');
    setIsReversed(false);
  };

  const isModified = activeSort !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': activeSort !== 'alphabet',
          })}
          onClick={() => applySort('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': activeSort !== 'length',
          })}
          onClick={() => applySort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
