import {SelectList} from 'react-native-dropdown-select-list';
import {Text, StyleSheet} from 'react-native';

export function Spinner({setSelected, data, label, placeholder}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <SelectList
        setSelected={val => setSelected(val)}
        data={data}
        save="value"
        inputStyles={{
          color: '#000',
        }}
        dropdownTextStyles={{color: '#000'}}
        placeholder={placeholder}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#000',
    fontSize: 17,
    marginVertical: 14,
  },
});
