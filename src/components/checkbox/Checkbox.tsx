import React from 'react';
import styles from './Checkbox.module.css';

type Props = {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Checkbox({ label, checked, onChange }: Props) {
  return (
    <label className={styles.checkbox}>
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxMark}></span>
    </label>
  );
}

export default Checkbox;
