import InputMask from 'react-input-mask';

export default function InputFone({ label, name, value, onChange, onBlur }) {
    return (
        <InputMask
            className="ml-5 bg-black-input text-white rounded px-4 py-3"
            mask="(99) 99999-9999"
            maskChar={null}
            placeholder="Telefone"
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
    }