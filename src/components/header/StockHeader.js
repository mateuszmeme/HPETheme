import React from 'react';

const StockHeader = ({ stockData }) => {
    const { Symbol, Value, Change } = stockData.default
    return <div className="header-stock">
        {`${Symbol} ${Value} ${Change}`}
    </div>
}

export default StockHeader;