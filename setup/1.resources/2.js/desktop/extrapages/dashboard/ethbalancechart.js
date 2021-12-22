async function graphBalance(ethaddress) {
    const result = await fetch(apiurl + '/wallet/getbalanceforchart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress: pageaddress
        })
    }).then((res) => res.json())
    let res = result.data;
    let final = [];
    for (let i = 0; i < res.length; i++) {
        let timestamp = res[i][0];
        let price = res[i][1];
        final.push([new Date(timestamp), price])
    }
    //console.log(final)

    //drawWalletBalanceChart(final);
    return final
}

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawWalletBalanceChart);

async function drawWalletBalanceChart() {
    let ethaddress = await findpageaddress();
    let balances = await graphBalance(ethaddress);
    //console.log(balances)
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Time');
    data.addColumn('number', 'Balance');
    // for (let i = 0; i < balances.length; i++) {
    //     data.addRow(balances[i]);
    // }
    data.addRows(balances);

    var options = {
        hAxis: {
            format: 'MMM',
            gridlines: { color: '#414141' },
            textStyle: { color: '#808080' }
        },
        vAxis: {
            title: "Balance in ETH",
            titleTextStyle: { color: '#808080' },
            minValue: 0,
            gridlines: { color: 'none' },
            textStyle: { color: '#808080' }
        },
        backgroundColor: "transparent",
        fontName: 'Google Sans',
        tooltip: {
            textStyle: { color: 'white', bold: true },
            isHtml: true
        },
        colors: ['#b48948', ]
    };

    var chart = new google.visualization.AreaChart(document.getElementById('ethbalancechart'));
    chart.draw(data, options);
}