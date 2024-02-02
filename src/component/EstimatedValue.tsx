import currency from 'currency.js';

interface Props {
  total: number;
}
export default function EstimatedValue({ total }: Props) {
  if (total <= 0) return <></>;
  return (
    <div className="inputField">
      <p className="totalTitle">Estimated Value</p>
      <p className="total">{currency(total, { symbol: '$' }).format()}</p>
    </div>
  );
}
