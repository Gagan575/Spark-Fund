import { useState, useEffect } from "react";

export default function SeatsLayout({ seatLayout = [], onSeatChange }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setSelectedSeats([]);
    onSeatChange([]);
  }, [seatLayout]);

  const toggleSeat = (rowName, seatNo, price) => {
    const seatId = `${rowName}${seatNo}`;
    let updatedSeats;

    if (selectedSeats.find((s) => s.seatId === seatId)) {
      updatedSeats = selectedSeats.filter((s) => s.seatId !== seatId);
    } else {
     updatedSeats = [
  ...selectedSeats,
  { seatId, rowName, seatNo, price }
];
    }

    setSelectedSeats(updatedSeats);
    onSeatChange(updatedSeats);
  };

  return (
    <div className="bms-container">
      <div className="screen w-100">SCREEN</div>

      {seatLayout.map((row, i) => (
        <div key={i} className="seat-row ">
          {/* Row label and ticket price container */}
          <div className="row-header w-25 ">
            <div className="row-label ">{row.rowName}</div>
            <div className="row-price ">₹{row.price}</div>
          </div>

          <div className="row-seats w-75">
            {Array.from({ length: row.seats }).map((_, index) => {
              const seatNo = index + 1;
              const seatId = `${row.rowName}${seatNo}`;
              const selected = selectedSeats.find((s) => s.seatId === seatId);
              const booked = row.bookedSeats?.includes(seatNo);

              return (
                <button
                  key={seatNo}
                  className={`seat ${booked ? "booked" : selected ? "selected" : "available"}`}
                  disabled={booked}
                  onClick={() => toggleSeat(row.rowName, seatNo, row.price)}
                >
                  {seatNo}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="legend">
        <span>
          <button className="seat available" /> Available
        </span>
        <span>
          <button className="seat selected" /> Selected
        </span>
        <span>
          <button className="seat booked" /> Booked
        </span>
      </div>

      <style jsx>{`
        .row-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .row-price {
          background: #f0f0f0;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
