$(function () {
    // controls
    var requestsControl = $('#requests');
    var conversionControl = $('#conversion');
    var requestCostControl = $('#requestCost');

    // result elements
    var salesResultElement = $('#salesResult');
    var profitResultElement = $('#profitResult');
    var orderCurrentCostElement = $('#currentCost');
    var orderDownCostElement = $('#downCost');

    // state vars
    var state = {
        raw: {
            requests: 0,
            conversion: 0,
            requestCost: 0
        },
        derived: {
            sales: 0,
            profitSales: 0,
            totalSales: 0,
            currentOrderCost: 0,
            profitOrderCost: 0
        }
    };

    // logic
    function updateSalesResults() {
        var requests = parseInt(requestsControl.val());
        var conversion = parseInt(conversionControl.val());

        requests = isNaN(requests) ? 0 : requests;
        conversion = isNaN(conversion) ? 0 : conversion;

        var remains = requests * 0.4;
        var realRequests = requests - remains;
        
        var sales = realRequests * (conversion / 100);
        var lostSales = remains * (conversion / 100);

        var outFlow = requests - (sales + lostSales);
        var boost = Math.round(outFlow * 0.02);

        var profitSales = lostSales + boost;

        state.raw.requests = requests;
        state.raw.conversion = conversion;
        state.derived.sales = sales;
        state.derived.profitSales = profitSales;
        state.derived.totalSales = sales + lostSales;
    }

    function updateDownCostResults() {
        var requestCost = parseInt(requestCostControl.val());

        requestCost = isNaN(requestCost) ? 0 : requestCost;

        var totalCost = requestCost * state.raw.requests;

        var currentOrderCost = state.derived.totalSales ? totalCost / state.derived.totalSales : 0;
        var totalProfitSales = state.derived.totalSales + state.derived.profitSales;
        var profitOrderCost = totalProfitSales ? currentOrderCost - (totalCost / totalProfitSales) : 0;

        state.raw.requestCost = requestCost;
        state.derived.currentOrderCost = currentOrderCost;
        state.derived.profitOrderCost = profitOrderCost;
    }

    // views
    function updateViews() {
        var sales = Math.round(state.derived.sales);
        var profitSales = Math.round(state.derived.profitSales);
        var currentOrderCost = Math.round(state.derived.currentOrderCost);
        var profitOrderCost = Math.round(state.derived.profitOrderCost);

        salesResultElement.html(sales);
        profitResultElement.html(profitSales);

        orderCurrentCostElement.html(currentOrderCost);
        orderDownCostElement.html(profitOrderCost);
    }

    function handler() {
        updateSalesResults();
        updateDownCostResults();
        updateViews();
    }

    // subscribe
    requestsControl.on('input', handler);
    conversionControl.on('input', handler);
    requestCostControl.on('input', handler);

    // init views
    updateViews();
});