// CORE
import {Component,OnInit,Input,ViewChild,Testability,Output,EventEmitter} from "@angular/core";
import {DatePipe} from "@angular/common";
import {Observable,Subscription} from "rxjs";
import * as fs from 'fs';

// MATERIAL
import {MatTableDataSource} from "@angular/material/table";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {FormControl} from "@angular/forms";

import {FormBuilder,FormGroup} from "@angular/forms";
import {RangesFooter} from "./ranges-footer/ranges-footer.component";

// MOMENT
import * as moment from "moment";

// AUTHENTIFICATION
import {AuthenticationService} from "../../services/authentication.service";

// MODELS
import {VendingData} from "../../models/dataInterfaceVending";
import {SelectaData} from "../../models/dataInterfaceSelecta";
import {MachinesData} from "../../models/dataInterfaceMachines";

// SERVICES
import {DataService} from '../../services/data.service';
import {HttpClient} from '@angular/common/http';

// DATA chartsLineChartAmountOperator
import {chartsLineChartAmountDaily} from "../../charts/chartsLineChartAmountDaily.data";
import {chartsLineChartTransactionsOperator} from "../../charts/chartsLineChartTransactionsOperator.data";
//import {chartsBarVerticalAmountDay} from "../../charts/chartsBarVerticalAmountDay.data";
//import {chartsBarVerticalTransactionsDay} from "../../charts/chartsBarVerticalTransactionsDay.data";

// VENDING DATA - localstorage
import {vendingDataMonthsJanuary} from "../../data/vendingDataMonthsJanuary.data";

// CSV
import {ReadingCSVService} from "../../services/csv.service";

// VOUCHER DATA
import {groupedVerticalBarChart} from "../../data/groupedVerticalBarChart.data";
import {stackedVerticalBarChart} from "../../data/stackedVerticalBarChart.data";

import {selectaVoucherTwint} from "../../data/SelectaVoucherTwint.data";
import {selectaVoucherSMS} from "../../data/SelectaVoucherSMS.data";
import {element} from 'protractor';

@Component({
  selector: "app-section-home",
  templateUrl: "./section-home.component.html",
  styleUrls: ["./section-home.component.scss"]
})

export class SectionHomeComponent implements OnInit {

  // VENDING - SMS - TWINT
  vendingDataMonthsSelect = vendingDataMonthsJanuary;
  smsDataMonthsSelect = [];
  twintDataMonthsSelect = [];
  // SELECTA SMS - SELECTA TWINT
  selectaVoucherSMS: any;
  selectaVoucherTwint: any;


  currentUser;
  csvVendingData$: any;
  csvSmsData$: Observable < SelectaData[] > ;
  csvTwintData$: Observable < SelectaData[] > ;

  storageValues = JSON.parse(localStorage.getItem("vendingDataMonths"));
  storageValuesSMS = JSON.parse(localStorage.getItem("smsDataMonths"));
  storageValuesTwint = JSON.parse(localStorage.getItem("twintDataMonths"));

  // CHARTS
  public chartsBarVertical2DVoucherPayments = [];
  public chartsBarVerticalVoucherPayments = [];
  public chartsBarVerticalAmountOperator = [];
  public chartsBarHorizontalOperatorTotal = [];
  public chartsBarVertical2DAmountsPaymentMethod = [];

  public chartsAreaChartTransactionsDay = [];

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private readingCSVService: ReadingCSVService,
    private http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
    this.csvVendingData$ = this.readingCSVService.getCSVvending();
    this.csvSmsData$ = this.readingCSVService.getCSVsms();
    this.csvTwintData$ = this.readingCSVService.getCSVtwint();

    Object.assign(this, {
      chartsLineChartAmountDaily
    });
    Object.assign(this, {
      chartsLineChartTransactionsOperator
    });
    // Selecta & Twint data
    Object.assign(this, {
      selectaVoucherSMS
    });
    Object.assign(this, {
      selectaVoucherTwint
    });
    Object.assign(this, {
      groupedVerticalBarChart
    });
    Object.assign(this, {
      stackedVerticalBarChart
    });

    // DATA MOMENT
    const dateStartDate = moment(this.vendingDataMonthsSelect[0].Date);
    const dateEndDate = moment(
      this.vendingDataMonthsSelect[this.vendingDataMonthsSelect.length - 1].Date
    );

    let dateStartFormat = dateStartDate.format("YYYY,M,D");
    let dateEndFormat = dateEndDate.format("YYYY,M,D");

    this.form = fb.group({
      // YYYY,M,D
      date: [{
        begin: new Date(dateStartFormat),
        end: new Date(dateEndFormat)
      }]
    });

  }

  isActive = false;

  chartsLineChartAmountDaily: any[];
  chartsLineChartTransactionsOperator: any[];
  chartsBarVerticalTransactionsDay: any[];
  chartsBarVerticalAmountDay: any[];

  minDateSelected: string;
  maxDateSelected: string;
  public filterData: any = {};
  multiselectRange;

  eventsDatepickerFrom: string[] = [];
  eventsDatepickerTo: string[] = [];

  // TABLES
  opened: boolean;
  selected = "October";

  // CHART
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = false;
  showLabels = true;
  xAxisLabel = false;
  yAxisLabel = false;
  view = true;
  multiselect = "singleselect";
  showXAxis = true;
  showYAxis = true;
  chart_data: any[];
  colorScheme = {
    domain: ["#FF8C00", "#42240c", "#FFD700", "#9e8d8f", "#FF7F50"]
  };
  colorSchemeMonochromatic = {
    domain: ["#FF8C00"]
  };
  colorSchemeVoucher = {
    domain: ["#FF8C00", "#9e8d8f"]
  };

  form: FormGroup;
  rangesFooter = RangesFooter;

  //TOP VALUES NAVIGATION BAR
  priceTotal = 0;
  priceAverage = 0;
  transactionsTotal = 0;
  transactionsAverage = 0;

  statusOk = 0;
  statusWarning = 0;
  statusError = 0;
  minDate;
  maxDate;
  filterResults;
  filterResultsVoucherSMS;
  filterResultsVoucherTwint;

  public vendingAverageRangeData = [];
  public uniqueValuesDate = [];
  public uniqueValuesDevice = [];
  public uniqueValuesDateObj = [];

  public chartsPieChartPaymentMethod = [];

  public chartsAreaChartAmountDay = [];
  public uniqueValuesTransactionSeriesSalt = [];
  public uniqueValuesTransactionSeriesSunrise = [];
  public uniqueValuesTransactionSeriesSwisscom = [];
  public uniqueValuesTransactionSeriesTwint = [];
  public twintValuesTemp = [];
  public smsValuesTemp = [];
  public tempSMS = [];
  public tempTwint = [];

  public numberTransactionsByDayWeek = [];
  public numberTransactionsByDayWeekAverage = [];
  public amountTransactionsByDayWeek = [];
  public amountTransactionsByDayWeekAverage = [];

  public daysOfWeekAverageNumberTransactionsByDayWeek = [{
    name: "Monday",
    value: 0
  },
  {
    name: "Tuesday",
    value: 0
  },
  {
    name: "Wednesday",
    value: 0
  },
  {
    name: "Thursday",
    value: 0
  },
  {
    name: "Friday",
    value: 0
  },
  {
    name: "Saturday",
    value: 0
  },
  {
    name: "Sunday",
    value: 0
  }
  ];

  public daysOfWeekAverageAmountTransactionsByDayWeek = [{
      name: "Monday",
      value: 0
    },
    {
      name: "Tuesday",
      value: 0
    },
    {
      name: "Wednesday",
      value: 0
    },
    {
      name: "Thursday",
      value: 0
    },
    {
      name: "Friday",
      value: 0
    },
    {
      name: "Saturday",
      value: 0
    },
    {
      name: "Sunday",
      value: 0
    }
  ];

  public seriesTwintSMS = [{
      name: "SMS",
      value: 0
    },
    {
      name: "Twint",
      value: 0
    }
  ]
  public seriesTwintSMSWeeks = []
  public uniqueValuesAmountByDayPaymentMethod = [];
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //MATERIAL FORMS
  monthsForm = new FormControl();
  rangeForm = new FormControl();
  multiselectData: Array < string > = [];

  matOptionDate = new Date();
  matOptionMonth = this.matOptionDate.getMonth();
  monthSelect = this.months[this.matOptionMonth - 1];

  // @param date - element DATE in format DD.MM.YYYY
  // @return - CONVERT DD.MM.YYYY to YYYY,DD,MM
  DDMMYYYtoYYYYDDMMconvert = (date) => {
    return (date.slice(6, 10) + ',' + date.slice(3, 5) + ',' + date.slice(0, 2));
  }

  // @param date - element DATE in format YYYY-DD-MM
  // @return - Convert YYYY-DD-MM to timestamp
  convertYYYYDDMMtoTimestamp = (date) => {
    return (new Date(date)).getTime();
  };

  // @param element - element DATE property
  // @param dateStart -  START date from selected range
  // @param dateEnd - END date from selected range
  // @return - returns comparison result for selected date range and element date
  compareElementWithSelectedRange(element, dateStart, dateEnd){
    return this.convertYYYYDDMMtoTimestamp(this.convertYYYYDDMMtoTimestamp(element)) >= this.convertYYYYDDMMtoTimestamp(this.convertYYYYDDMMtoTimestamp(dateStart)) && this.convertYYYYDDMMtoTimestamp(this.convertYYYYDDMMtoTimestamp(element)) <= this.convertYYYYDDMMtoTimestamp(this.convertYYYYDDMMtoTimestamp(dateEnd));
  }

  activeYear = new Date().getFullYear();
  firstDayActiveYear = new Date(this.activeYear, 0, 1)
  //RANGE SELECT - START
  dateFromVendingDataMonths = "";
  range = ["7 days", "28 days", "90 days", "This year"];
  endDateRange = Date.now();

  startDateRange = 0;

  selectRange($event) {
    let rangeSelect = $event.value;
    let multiselectRange = $event.value.length;

    if ($event.value === "7 days") {
      this.startDateRange = this.endDateRange - (86400000 * 8);
      this.monthSelect = "7 days";
    }
    if ($event.value === "28 days") {
      this.startDateRange = this.endDateRange - (86400000 * 29);
      this.monthSelect = "28 days";
    }
    if ($event.value === "90 days") {
      this.monthSelect = "90 days";
      this.startDateRange = this.endDateRange - (86400000 * 91);
    }
    if ($event.value === 'This year') {
      this.monthSelect = "This year";
      this.startDateRange = this.convertYYYYDDMMtoTimestamp(this.firstDayActiveYear);
    }

    this.vendingDataMonthsSelect = [];
    this.smsDataMonthsSelect = [];
    this.twintDataMonthsSelect = [];

    this.storageValues = JSON.parse(localStorage.getItem("vendingDataMonths"));
    this.storageValuesSMS = JSON.parse(localStorage.getItem("smsDataMonths"));
    this.storageValuesTwint = JSON.parse(localStorage.getItem("twintDataMonths"));

    // REFACTOR START - DRY
    this.vendingDataMonthsSelect = this.storageValues.filter((ele) => {
      this.dateFromVendingDataMonths = this.DDMMYYYtoYYYYDDMMconvert(ele.Date);
      return ((this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) > this.startDateRange) && (this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) <= this.endDateRange));
    });

    this.smsDataMonthsSelect = this.storageValuesSMS.filter((ele) => {
      this.dateFromVendingDataMonths = this.DDMMYYYtoYYYYDDMMconvert(ele.Date);
      if ((this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) > this.startDateRange) && (this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) <= this.endDateRange))
        return ((this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) > this.startDateRange) && (this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) <= this.endDateRange));
    });

    this.twintDataMonthsSelect = this.storageValuesTwint.filter((ele) => {
      this.dateFromVendingDataMonths = this.DDMMYYYtoYYYYDDMMconvert(ele.Date);
      return ((this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) > this.startDateRange) && (this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) <= this.endDateRange));
    });
    // REFACTOR END - DRY

    // REFACTOR START - duplication reduce
    this.getAllDaysFromMonth(this.vendingDataMonthsSelect, rangeSelect, multiselectRange);

    this.chartsBarVertical2DVoucherPayments = [];
    this.chartsBarVerticalVoucherPayments = [];
    groupedVerticalBarChart[0].series[0].value = 0;
    groupedVerticalBarChart[0].series[1].value = 0;
    groupedVerticalBarChart[1].series[0].value = 0;
    groupedVerticalBarChart[1].series[1].value = 0;

    stackedVerticalBarChart[0].series[0].value = 0;
    stackedVerticalBarChart[0].series[1].value = 0;

    this.smsDataMonthsSelect.forEach(elem => {
      groupedVerticalBarChart[0].series[0].value =
        groupedVerticalBarChart[0].series[0].value + elem.Charged;
      groupedVerticalBarChart[0].series[1].value =
        groupedVerticalBarChart[0].series[1].value + elem.Voucher;

      stackedVerticalBarChart[0].series[0].value =
        stackedVerticalBarChart[0].series[0].value + elem.Productprice;
    });

    this.twintDataMonthsSelect.forEach(elem => {
      groupedVerticalBarChart[1].series[0].value =
        groupedVerticalBarChart[1].series[0].value + elem.Charged;
      groupedVerticalBarChart[1].series[1].value =
        groupedVerticalBarChart[1].series[1].value + elem.Voucher;

      stackedVerticalBarChart[0].series[1].value =
        stackedVerticalBarChart[0].series[1].value + elem.Productprice;
    });

    this.chartsBarVertical2DVoucherPayments = [...groupedVerticalBarChart];
    this.chartsBarVerticalVoucherPayments = [...stackedVerticalBarChart];
    // REFACTOR END - duplication reduce
  }
  //RANGE SELECT - END
  selectMonth($event) {
    this.vendingDataMonthsSelect = [];
    this.smsDataMonthsSelect = [];
    this.twintDataMonthsSelect = [];

    if ($event.value.length > 1)
      this.multiselect = 'multiselect';
    else
      this.multiselect = 'singleselect';

    let rangeSelect = this.multiselect;
    let multiselectRange = $event.value.length;

    this.monthSelect = $event.value;

    if (!this.multiselectData.includes($event.source.value)) {
      this.multiselectData.push($event.source.value);
    } else {
      this.multiselectData.forEach((elem, index) => {
        if (elem === $event.source.value) this.multiselectData.splice(index, 1);
      });
    }

    this.storageValues = JSON.parse(localStorage.getItem("vendingDataMonths"));
    this.storageValuesSMS = JSON.parse(localStorage.getItem("smsDataMonths"));
    this.storageValuesTwint = JSON.parse(localStorage.getItem("twintDataMonths"));

    this.vendingDataMonthsSelect = [];
    let monthSelectedJanuary = [];
    let monthSelectedFebruary = [];
    let monthSelectedMarch = [];
    let monthSelectedApril = [];
    let monthSelectedMay = [];
    let monthSelectedJune = [];
    let monthSelectedJuly = [];
    let monthSelectedAugust = [];
    let monthSelectedSeptember = [];
    let monthSelectedOctober = [];
    let monthSelectedNovember = [];
    let monthSelectedDecember = [];

    this.smsDataMonthsSelect = [];
    let monthSelectedJanuarySMS = [];
    let monthSelectedFebruarySMS = [];
    let monthSelectedMarchSMS = [];
    let monthSelectedAprilSMS = [];
    let monthSelectedMaySMS = [];
    let monthSelectedJuneSMS = [];
    let monthSelectedJulySMS = [];
    let monthSelectedAugustSMS = [];
    let monthSelectedSeptemberSMS = [];
    let monthSelectedOctoberSMS = [];
    let monthSelectedNovemberSMS = [];
    let monthSelectedDecemberSMS = [];

    this.twintDataMonthsSelect = [];
    let monthSelectedJanuaryTwint = [];
    let monthSelectedFebruaryTwint = [];
    let monthSelectedMarchTwint = [];
    let monthSelectedAprilTwint = [];
    let monthSelectedMayTwint = [];
    let monthSelectedJuneTwint = [];
    let monthSelectedJulyTwint = [];
    let monthSelectedAugustTwint = [];
    let monthSelectedSeptemberTwint = [];
    let monthSelectedOctoberTwint = [];
    let monthSelectedNovemberTwint = [];
    let monthSelectedDecemberTwint = [];

    if (this.monthSelect.includes("January")) {
      monthSelectedJanuary = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '01';
      });
      monthSelectedJanuarySMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '01';
      });
      monthSelectedJanuaryTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '01';
      });
    }
    if (this.monthSelect.includes("February")) {
      monthSelectedFebruary = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '02';
      });
      monthSelectedFebruarySMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '02';
      });
      monthSelectedFebruaryTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '02';
      });
    }
    if (this.monthSelect.includes("March")) {
      monthSelectedMarch = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '03';
      });
      monthSelectedMarchSMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '03';
      });
      monthSelectedMarchTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '03';
      });
    }
    if (this.monthSelect.includes("April")) {
      monthSelectedApril = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '04';
      });
      monthSelectedAprilSMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '04';
      });
      monthSelectedAprilTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '04';
      });
    }
    if (this.monthSelect.includes("May")) {
      monthSelectedMay = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '05';
      });
      monthSelectedMaySMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '05';
      });
      monthSelectedMayTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '05';
      });
    }
    if (this.monthSelect.includes("June")) {
      monthSelectedJune = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '06';
      });
      monthSelectedJuneSMS = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '06';
      });
      monthSelectedJuneTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '06';
      });
    }
    if (this.monthSelect.includes("July")) {
      monthSelectedJuly = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '07';
      });
      monthSelectedJulySMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '07';
      });
      monthSelectedJulyTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '07';
      });
    }
    if (this.monthSelect.includes("August")) {
      monthSelectedAugust = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '08';
      });
      monthSelectedAugustSMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '08';
      });
      monthSelectedAugustTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '08';
      });
    }

    if (this.monthSelect.includes("September")) {
      monthSelectedSeptember = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '09';
      });
      monthSelectedSeptemberSMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '09';
      });
      monthSelectedSeptemberTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '09';
      });
    }
    if (this.monthSelect.includes("October")) {
      monthSelectedOctober = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '10';
      });
      monthSelectedOctoberSMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '10';
      });
      monthSelectedOctoberTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '10';
      });
    }
    if (this.monthSelect.includes("November")) {
      monthSelectedNovember = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '11';
      });
      monthSelectedNovemberSMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '11';
      });
      monthSelectedNovemberTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '11';
      });
    }
    if (this.monthSelect.includes("December")) {
      monthSelectedDecember = this.storageValues.filter(function(el) {
        return el.Date.substring(3, 5) == '12';
      });
      monthSelectedDecemberSMS = this.storageValuesSMS.filter(function(el) {
        return el.Date.substring(3, 5) == '12';
      });
      monthSelectedDecemberTwint = this.storageValuesTwint.filter(function(el) {
        return el.Date.substring(3, 5) == '12';
      });
    }

    this.vendingDataMonthsSelect = [
      ...monthSelectedJanuary,
      ...monthSelectedFebruary,
      ...monthSelectedMarch,
      ...monthSelectedApril,
      ...monthSelectedMay,
      ...monthSelectedJune,
      ...monthSelectedJuly,
      ...monthSelectedAugust,
      ...monthSelectedSeptember,
      ...monthSelectedOctober,
      ...monthSelectedNovember,
      ...monthSelectedDecember
    ];

    this.smsDataMonthsSelect = [
      ...monthSelectedJanuarySMS,
      ...monthSelectedFebruarySMS,
      ...monthSelectedMarchSMS,
      ...monthSelectedAprilSMS,
      ...monthSelectedMaySMS,
      ...monthSelectedJuneSMS,
      ...monthSelectedJulySMS,
      ...monthSelectedAugustSMS,
      ...monthSelectedSeptemberSMS,
      ...monthSelectedOctoberSMS,
      ...monthSelectedNovemberSMS,
      ...monthSelectedDecemberSMS
    ];

    this.twintDataMonthsSelect = [
      ...monthSelectedJanuaryTwint,
      ...monthSelectedFebruaryTwint,
      ...monthSelectedMarchTwint,
      ...monthSelectedAprilTwint,
      ...monthSelectedMayTwint,
      ...monthSelectedJuneTwint,
      ...monthSelectedJulyTwint,
      ...monthSelectedAugustTwint,
      ...monthSelectedSeptemberTwint,
      ...monthSelectedOctoberTwint,
      ...monthSelectedNovemberTwint,
      ...monthSelectedDecemberTwint
    ];

    this.getAllDaysFromMonth(this.vendingDataMonthsSelect, rangeSelect, multiselectRange);

    this.chartsBarVertical2DVoucherPayments = [];
    this.chartsBarVerticalVoucherPayments = [];
    groupedVerticalBarChart[0].series[0].value = 0;
    groupedVerticalBarChart[0].series[1].value = 0;
    groupedVerticalBarChart[1].series[0].value = 0;
    groupedVerticalBarChart[1].series[1].value = 0;

    stackedVerticalBarChart[0].series[0].value = 0;
    stackedVerticalBarChart[0].series[1].value = 0;

    this.smsDataMonthsSelect.forEach(elem => {
      groupedVerticalBarChart[0].series[0].value =
        groupedVerticalBarChart[0].series[0].value + elem.Charged;
      groupedVerticalBarChart[0].series[1].value =
        groupedVerticalBarChart[0].series[1].value + elem.Voucher;

      stackedVerticalBarChart[0].series[0].value =
        stackedVerticalBarChart[0].series[0].value + elem.Productprice;
    });

    this.twintDataMonthsSelect.forEach(elem => {
      groupedVerticalBarChart[1].series[0].value =
        groupedVerticalBarChart[1].series[0].value + elem.Charged;
      groupedVerticalBarChart[1].series[1].value =
        groupedVerticalBarChart[1].series[1].value + elem.Voucher;

      stackedVerticalBarChart[0].series[1].value =
        stackedVerticalBarChart[0].series[1].value + elem.Productprice;
    });

    this.chartsBarVertical2DVoucherPayments = [...groupedVerticalBarChart];
    this.chartsBarVerticalVoucherPayments = [...stackedVerticalBarChart];
  }

  getAllDaysFromMonth(datasource, rangeSelect, multiselectRange) {
    const dtStart = datasource[0].Date;
    const dtEnd = datasource[datasource.length - 1].Date;

    const dateStartDate = moment(datasource[0].Date);
    const dateEndDate = moment(datasource[datasource.length - 1].Date);

    //let dateStartFormat = dateStartDate.format("YYYY,D,M");
    //let dateEndFormat = dateEndDate.format("YYYY,D,M");

    let dateStartFormat = dtStart.slice(6, 10) + ',' + dtStart.slice(3, 5) + ',' + dtStart.slice(0, 2);
    let dateEndFormat = dtEnd.slice(6, 10) + ',' + dtEnd.slice(3, 5) + ',' + dtEnd.slice(0, 2);

    this.minDate = new Date(dateStartFormat);
    //this.minDate = new Date("2020,01,01");
    this.maxDate = new Date(dateEndFormat);

    //this.maxDate = new Date("2020,01,07");
    this.minDateSelected = dateStartDate.format("DD/MM/YYYY");
    this.maxDateSelected = dateEndDate.format("DD/MM/YYYY");

    // FILTER BY DATE RANGE
    let eventValueFrom = moment(datasource[0].Date);
    let eventValueFromFilter = eventValueFrom.format("MM.DD.YYYY");
    let eventValueTo = moment(datasource[datasource.length - 1].Date);
    let eventValueToFilter = eventValueTo.format("MM.DD.YYYY");


    this.filterDataSource(dtStart, dtEnd, rangeSelect, multiselectRange);
    this.filterVoucherDataSource(dtStart, dtEnd);
  }

  // @param dateStart - START date from selected range
  // @param monthSelected - month selected based on dateStart
  // @return monthSelected - returns month selected based on dateStart
  fromToMonthSelect(dateStart, monthSelected) {
    (dateStart) => {
      switch (dateStart) {
        case "01.01.2020":
          return monthSelected = "January";
          break;
        case "01.02.2020":
          return monthSelected = "February";
          break;
        case "01.03.2020":
          return monthSelected = "March";
          break;
        case "01.04.2020":
          return monthSelected = "April";
          break;
        case "01.05.2020":
          return monthSelected = "May";
          break;
        case "01.06.2020":
          return monthSelected = "June";
          break;
        case "01.07.2020":
          return monthSelected = "July";
          break;
        case "01.08.2020":
          return monthSelected = "August";
          break;
        case "01.09.2020":
          return monthSelected = "September";
          break;
        case "01.10.2020":
          return monthSelected = "October";
          break;
        case "01.11.2020":
          return monthSelected = "November";
          break;
        case "01.12.2020":
          return monthSelected = "December";
          break;
      }
    };
  }

  // @param dateStart - START date from selected range
  // @param dateEnd - END date from selected range
  filterDataSource(dateStart, dateEnd, rangeSelect, multiselectRange) {
    this.fromToMonthSelect(dateStart, dateEnd);

    this.statusOk = 0;
    this.priceTotal = 0;
    this.transactionsTotal = 0;
    this.statusWarning = 0;
    this.statusError = 0;

    this.chartsAreaChartTransactionsDay = [];
    this.chartsAreaChartAmountDay = [];
    this.chartsBarHorizontalOperatorTotal = [];
    this.chartsBarVerticalAmountOperator = [];

    this.uniqueValuesDateObj = [];
    this.uniqueValuesTransactionSeriesSunrise = [];
    this.uniqueValuesTransactionSeriesSwisscom = [];
    this.uniqueValuesTransactionSeriesTwint = [];
    this.uniqueValuesTransactionSeriesSalt = [];
    this.uniqueValuesAmountByDayPaymentMethod = [];
    this.tempSMS = [];
    this.tempTwint = [];
    this.chartsBarVertical2DAmountsPaymentMethod = [];
    this.numberTransactionsByDayWeek = [];
    this.numberTransactionsByDayWeekAverage = [];
    this.amountTransactionsByDayWeek = [];
    this.amountTransactionsByDayWeekAverage = [];
    this.chartsBarVerticalAmountDay = [{
      name: "Monday",
      value: 0
    },
    {
      name: "Tuesday",
      value: 0
    },
    {
      name: "Wednesday",
      value: 0
    },
    {
      name: "Thursday",
      value: 0
    },
    {
      name: "Friday",
      value: 0
    },
    {
      name: "Saturday",
      value: 0
    },
    {
      name: "Sunday",
      value: 0
    }
    ];
    this.chartsBarVerticalTransactionsDay = [{
        name: "Monday",
        value: 0
      },
      {
        name: "Tuesday",
        value: 0
      },
      {
        name: "Wednesday",
        value: 0
      },
      {
        name: "Thursday",
        value: 0
      },
      {
        name: "Friday",
        value: 0
      },
      {
        name: "Saturday",
        value: 0
      },
      {
        name: "Sunday",
        value: 0
      }
    ];
    this.seriesTwintSMS = [{
        name: "SMS",
        value: 0
      },
      {
        name: "Twint",
        value: 0
      }
    ]
    this.seriesTwintSMSWeeks = []

    let startDateRangeFrom = this.convertYYYYDDMMtoTimestamp(this.DDMMYYYtoYYYYDDMMconvert(dateStart));
    let endDateRangeTo = this.convertYYYYDDMMtoTimestamp(this.DDMMYYYtoYYYYDDMMconvert(dateEnd));

    this.filterResults = this.vendingDataMonthsSelect.filter(ele => {
      this.dateFromVendingDataMonths = this.DDMMYYYtoYYYYDDMMconvert(ele.Date);

      return ((this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) > startDateRangeFrom) && (this.convertYYYYDDMMtoTimestamp(this.dateFromVendingDataMonths) <= endDateRangeTo));
    });

    // CHART DATA
    this.uniqueValuesDate = [
      ...new Set(this.vendingDataMonthsSelect.map(item => item.Date))
    ];
    this.uniqueValuesDate.forEach(elem => {
      this.uniqueValuesDateObj.push({
        value: 0,
        name: elem,
        day: ""
      });
      this.chartsAreaChartAmountDay.push({
        value: 0,
        name: elem,
        day: ""
      });
      this.uniqueValuesTransactionSeriesSalt.push({
        name: elem,
        value: 0
      });
      this.uniqueValuesTransactionSeriesSunrise.push({
        value: 0,
        name: elem
      });
      this.uniqueValuesTransactionSeriesSwisscom.push({
        value: 0,
        name: elem
      });
      this.uniqueValuesTransactionSeriesTwint.push({
        value: 0,
        name: elem
      });
      // DOUBLE BAR CHART
      this.uniqueValuesAmountByDayPaymentMethod.push({
        name: elem,
        "series": [{
            "name": "SMS",
            "value": 0
          },
          {
            "name": "Twint",
            "value": 0
          }
        ]
      })
    });

    this.uniqueValuesDevice = [
      ...new Set(this.vendingDataMonthsSelect.map(item => item.Operator))
    ];

    this.uniqueValuesDevice.forEach(elem => {
      this.chartsBarHorizontalOperatorTotal.push({
        value: 0,
        name: elem
      });
      this.chartsBarVerticalAmountOperator.push({
        value: 0,
        name: elem
      });
    });

    // EMPTY ARRAY - line chart
    chartsLineChartTransactionsOperator[0].series = [];
    chartsLineChartTransactionsOperator[1].series = [];
    chartsLineChartTransactionsOperator[2].series = [];
    chartsLineChartTransactionsOperator[3].series = [];

    // EMPTY ARRAY - line chart
    chartsLineChartAmountDaily[0].series = [];
    chartsLineChartAmountDaily[1].series = [];
    chartsLineChartAmountDaily[2].series = [];
    chartsLineChartAmountDaily[3].series = [];

    this.filterResults.forEach(element => {
      // CHARTS GENERAL
      if (element.Status == "OK") {
        this.statusOk++;
        if (element.Price !== '\\N') {
          this.priceTotal = this.priceTotal + Number(element.Count);
          //this.transactionsTotal = this.transactionsTotal + Number(element.Count);
          this.transactionsTotal = this.transactionsTotal + (Number(element.Price) * Number(element.Count));
        }
      }
      if (element.Status == "Warning") {
        this.statusWarning++;
      }
      if (element.Status == "Error") {
        this.statusError++;
      }
      // COUNT
      this.uniqueValuesTransactionSeriesSalt.forEach((elem, index) => {
        if (element.Operator == 'Salt' && element.Price !== '\\N' && elem.name === element.Date) {
          elem.value = Number(elem.value) + Number(element.Count);
        }
      });
      this.uniqueValuesTransactionSeriesSwisscom.forEach((elem, index) => {
        if (element.Operator == 'Swisscom' && element.Price !== '\\N' && elem.name === element.Date) {
          elem.value = Number(elem.value) + Number(element.Count);
        }
      });
      this.uniqueValuesTransactionSeriesTwint.forEach((elem, index) => {
        if (element.Operator == 'Twint' && element.Price !== '\\N' && elem.name === element.Date) {
          elem.value = Number(elem.value) + Number(element.Count);
        }
      });
      this.uniqueValuesTransactionSeriesSunrise.forEach((elem, index) => {
        if (element.Operator == 'Sunrise' && element.Price !== '\\N' && elem.name === element.Date) {
          elem.value = Number(elem.value) + Number(element.Count);
        }
      });
      // COUNT
      this.uniqueValuesDateObj.forEach((elem, index) => {
        if (elem.name === element.Date && element.Price !== '\\N') {
          elem.value = Number(elem.value) + Number(element.Count);
        }
      });
      this.chartsAreaChartAmountDay.forEach((elem, index) => {
        if (elem.name === element.Date && element.Price !== '\\N') {
          elem.value = Number(elem.value) + (Number(element.Price) * Number(element.Count));
        }
      });
      this.chartsBarHorizontalOperatorTotal.forEach((elem, index) => {
        if (elem.name === element.Operator && element.Price !== '\\N') {
          elem.value = Number(elem.value) + Number(element.Count);
        }
      });
      this.chartsBarVerticalAmountOperator.forEach((elem, index) => {
        if (elem.name === element.Operator && element.Price !== '\\N') {
          elem.value = Number(elem.value) + (Number(element.Price) * Number(element.Count));
        }
      });


      // LINE CHART START - No. of Transactions By Operator Daily
      if (element.Operator == 'Salt' && element.Price !== '\\N') {
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.Date,dateStart, dateEnd)){
            this.chartsLineChartTransactionsOperator[0].series.push({
              name: element.Date,
              value: Number(element.Count)
            });
          }
        } else {
          this.chartsLineChartTransactionsOperator[0].series.push({
            name: element.Date,
            value: Number(element.Count)
          });
        }
      }
      if (element.Operator == 'Sunrise' && element.Price !== '\\N') {
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.Date,dateStart, dateEnd)){
            this.chartsLineChartTransactionsOperator[1].series.push({
              name: element.Date,
              value: Number(element.Count)
            });
          }
        } else {
          this.chartsLineChartTransactionsOperator[1].series.push({
            name: element.Date,
            value: Number(element.Count)
          });
        }
      }
      if (element.Operator == 'Swisscom' && element.Price !== '\\N') {
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.Date,dateStart, dateEnd)){
            this.chartsLineChartTransactionsOperator[2].series.push({
              name: element.Date,
              value: Number(element.Count)
            });
          }
        } else {
          this.chartsLineChartTransactionsOperator[2].series.push({
            name: element.Date,
            value: Number(element.Count)
          });
        }
      }
      if (element.Operator == 'Twint' && element.Price !== '\\N') {
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.Date,dateStart, dateEnd)){
            this.chartsLineChartTransactionsOperator[3].series.push({
              name: element.Date,
              value: Number(element.Count)
            });
          }
        } else {
          this.chartsLineChartTransactionsOperator[3].series.push({
            name: element.Date,
            value: Number(element.Count)
          });
        }
      }

      // GROUPED BAR CHART - Amounts by Day byPayment method
      let tempArr = [];

      if (element.Operator == 'Salt' && element.Price !== '\\N') {
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.Date,dateStart, dateEnd)){
            chartsLineChartAmountDaily[0].series.push({
              name: element.Date,
              value: Number(element.Price) * Number(element.Count)
            });
          }
        } else {
          chartsLineChartAmountDaily[0].series.push({
            name: element.Date,
            value: Number(element.Price) * Number(element.Count)
          });
        }
      }
      if (element.Operator == 'Sunrise' && element.Price !== '\\N') {
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.Date,dateStart, dateEnd)){
            chartsLineChartAmountDaily[1].series.push({
              name: element.Date,
              value: Number(element.Price) * Number(element.Count)
            });
          }
        } else {
          chartsLineChartAmountDaily[1].series.push({
            name: element.Date,
            value: Number(element.Price) * Number(element.Count)
          });
        }
      }
      if (element.Operator == 'Swisscom' && element.Price !== '\\N') {
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.Date,dateStart, dateEnd)){
            chartsLineChartAmountDaily[2].series.push({
              name: element.Date,
              value: Number(element.Price) * Number(element.Count)
            });
          }
        } else {
          chartsLineChartAmountDaily[2].series.push({
            name: element.Date,
            value: Number(element.Price) * Number(element.Count)
          });
        }
      }
      if (element.Operator == 'Twint' && element.Price !== '\\N') {
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.Date,dateStart, dateEnd)){
            chartsLineChartAmountDaily[3].series.push({
              name: element.Date,
              value: Number(element.Price) * Number(element.Count)
            });
          }
        } else {
          chartsLineChartAmountDaily[3].series.push({
            name: element.Date,
            value: Number(element.Price) * Number(element.Count)
          });
        }
      }
    });

    this.chartsLineChartTransactionsOperator = [...chartsLineChartTransactionsOperator];
    this.chartsLineChartAmountDaily = [...chartsLineChartAmountDaily];

    // FILTER BY OPERATOR AND GROUP BY DATE
    let filterByOperatorTwint = this.filterResults.filter((results) => {
      return results.Operator === "Twint";
    });

    let filterByOperatorSMS = this.filterResults.filter((results) => {
      return results.Operator !== "Twint";
    });

    let groupedfilterResultsTwint = filterByOperatorTwint.reduce((result, user) => {
      (result[user.Date] || (result[user.Date] = [])).push(user);
      return result;
    }, {});

    let groupedfilterResultsSMS = filterByOperatorSMS.reduce((result, user) => {
      (result[user.Date] || (result[user.Date] = [])).push(user);
      return result;
    }, {});

    Object.keys(groupedfilterResultsTwint).forEach((key, index) => {
      this.tempTwint.push({
        operator: "Twint",
        name: key,
        value: 0
      });
      groupedfilterResultsTwint[key].forEach(k => {
        if (k.Date === this.tempTwint[index].name) {
          this.tempTwint[index].value += Number(k.Count);
        }
      })
    });

    Object.keys(groupedfilterResultsSMS).forEach((key, index) => {
      this.tempSMS.push({
        operator: "SMS",
        name: key,
        value: 0
      });
      groupedfilterResultsSMS[key].forEach(k => {
        if (k.Date === this.tempSMS[index].name) {
          this.tempSMS[index].value += Number(k.Count);
        }
      })
    });

    this.tempSMS.forEach(sms => {
      this.chartsBarVertical2DAmountsPaymentMethod.push({
        name: sms.name,
        series: [{
            name: sms.operator,
            value: sms.value
          },
          {
            name: "",
            value: 0
          }
        ]
      })
    })

    this.tempTwint.forEach((twint, index) => {
      if (twint.name === this.chartsBarVertical2DAmountsPaymentMethod[index].name) {
        this.chartsBarVertical2DAmountsPaymentMethod[index].series[1].name = twint.operator;
        this.chartsBarVertical2DAmountsPaymentMethod[index].series[1].value = twint.value;
      }
    })

    /**
     * Returns an array with arrays of the given size.
     *
     * @param myArray {Array} Array to split
     * @param chunkSize {Integer} Size of every group
     */
    let chunkArray = (myArray, chunk_size) => {
      var results = [];

      while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
      }

      return results;
    }

    let nWeek = 1;
    let monthThisYear = new Date().getMonth();
    if (rangeSelect === '28 days' || rangeSelect === 'singleselect' || rangeSelect === 'single')
      nWeek = 7;
    if (rangeSelect === "90 days")
      nWeek = 30;
    if (rangeSelect === "This year") {
      nWeek = monthThisYear * 4;
    }
    if (rangeSelect === 'multiselect') {
      nWeek = 31;
    }

    let tempArray = [];

    // Split in group of n items
    if (rangeSelect === 1 || rangeSelect === '28 days' || rangeSelect === "90 days" || rangeSelect === "This year" || rangeSelect === "singleselect" || rangeSelect === "multiselect" || rangeSelect === "single") {
      let resultWeek = chunkArray(this.chartsBarVertical2DAmountsPaymentMethod, nWeek);

      let tempArrDays = [];

      resultWeek.forEach((element, index) => {
        if (nWeek === 7)
          element.name = "Week " + (index + 1);
        if (nWeek === 30)
          element.name = "Month " + (index + 1);
        if (rangeSelect === "This year")
          element.name = "Month " + (index + 1);
        if (rangeSelect === "multiselect") {
          element.name = "Month " + (index + 1);
        }
        if (rangeSelect === 1) {
          element.name = "Day " + (index + 1);
        }


        if (multiselectRange === "Date range") {
          let convertDDMMYYYYtoYYYYDDMM = (date) => {
            let tempDate = this.DDMMYYYtoYYYYDDMMconvert(date);
            return (new Date(tempDate)).getTime();
          }

          element.forEach((el, index) => {
            if (convertDDMMYYYYtoYYYYDDMM(el.name) >= convertDDMMYYYYtoYYYYDDMM(dateStart) && convertDDMMYYYYtoYYYYDDMM(el.name) <= convertDDMMYYYYtoYYYYDDMM(dateEnd)) {
              tempArrDays.push(el);
            }
          })
        }


        element.forEach((el, i) => {
          tempArray.push({
            name: element.name,
            series: [{
                name: "SMS",
                value: 0
              },
              {
                name: "Twint",
                value: 0
              },
            ]
          });
        })
      });

      const filteredArr = tempArray.reduce((acc, current) => {
        const x = acc.find(item => item.name === current.name);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      resultWeek.forEach((ele, index) => {
        ele.forEach((el, i) => {
          filteredArr[index].series[0].value = filteredArr[index].series[0].value + el.series[0].value;
          filteredArr[index].series[1].value = filteredArr[index].series[1].value + el.series[1].value;
        })
      })

      if (multiselectRange === "Date range")
        this.chartsBarVertical2DAmountsPaymentMethod = tempArrDays;
      else
        this.chartsBarVertical2DAmountsPaymentMethod = filteredArr;

    }

    let sumPaymentMethods = this.chartsBarHorizontalOperatorTotal.reduce((sum, el) => sum + el.value, 0);
    this.chartsPieChartPaymentMethod = [{
      "name": "Sms",
      "value": sumPaymentMethods - this.chartsBarHorizontalOperatorTotal[3].value
    }, {
      "name": "Twint",
      "value": this.chartsBarHorizontalOperatorTotal[3].value
    }];

    this.chartsPieChartPaymentMethod[0].value = ((this.chartsPieChartPaymentMethod[0].value / sumPaymentMethods) * 100).toFixed(0);
    this.chartsPieChartPaymentMethod[1].value = ((this.chartsPieChartPaymentMethod[1].value / sumPaymentMethods) * 100).toFixed(0);

    let uniqueDateFilter = [...new Set(this.filterResults.map(item => item.Date))]

    let arrayUniqueByKey = [...new Map(this.filterResults.map(item => [item["Date"], item])).values()];

    let objToArrayUnique = Object.keys(arrayUniqueByKey).map((key) => [Number(key), arrayUniqueByKey[key]]);

    this.uniqueValuesDateObj.forEach((elem, index) => {
      objToArrayUnique.forEach((e, i) => {
        if (elem.name === e[1].Date) {
          this.numberTransactionsByDayWeek.push({
            value: elem.value,
            name: e[1].Day,
            date: elem.name
          });
        }
      });
    });

    let convertDDMMYYYYtoYYYYDDMMDays = (date) => {
      let tempDate = this.DDMMYYYtoYYYYDDMMconvert(date);
      return (new Date(tempDate)).getTime();
    }

    this.numberTransactionsByDayWeek.forEach((element) => {
      if (element.name === "Monday") {
        if (multiselectRange !== "Date range") {
          this.chartsBarVerticalTransactionsDay[0].value += element.value;
        }
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.date,dateStart, dateEnd)){
            this.chartsBarVerticalTransactionsDay[0].value += element.value;
          }
        }
      }
      if (element.name === "Tuesday") {
        if (multiselectRange !== "Date range") {
          this.chartsBarVerticalTransactionsDay[1].value += element.value;
        }
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.date,dateStart, dateEnd)){
            this.chartsBarVerticalTransactionsDay[1].value += element.value;
          }
        }
      }
      if (element.name === "Wednesday") {
        if (multiselectRange !== "Date range") {
          this.chartsBarVerticalTransactionsDay[2].value += element.value;
        }
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.date,dateStart, dateEnd)){
            this.chartsBarVerticalTransactionsDay[2].value += element.value;
          }
        }
      }
      if (element.name === "Thursday") {
        if (multiselectRange !== "Date range") {
          this.chartsBarVerticalTransactionsDay[3].value += element.value;
        }
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.date,dateStart, dateEnd)){
            this.chartsBarVerticalTransactionsDay[3].value += element.value;
          }
        }
      }
      if (element.name === "Friday") {
        if (multiselectRange !== "Date range") {
          this.chartsBarVerticalTransactionsDay[4].value += element.value;
        }
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.date,dateStart, dateEnd)){
            this.chartsBarVerticalTransactionsDay[4].value += element.value;
          }
        }
      }
      if (element.name === "Saturday") {
        if (multiselectRange !== "Date range") {
          this.chartsBarVerticalTransactionsDay[5].value += element.value;
        }
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.date,dateStart, dateEnd)){
            this.chartsBarVerticalTransactionsDay[5].value += element.value;
          }
        }
      }
      if (element.name === "Sunday") {
        if (multiselectRange !== "Date range") {
          this.chartsBarVerticalTransactionsDay[6].value += element.value;
        }
        if (multiselectRange === "Date range") {
          if(this.compareElementWithSelectedRange(element.date,dateStart, dateEnd)){
            this.chartsBarVerticalTransactionsDay[6].value += element.value;
          }
        }
      }
    })

    // REFACTOR - arrow function + return remove
    this.uniqueValuesDateObj = this.uniqueValuesDateObj.filter((el) => {
      return el.value !== 0;
    });
    this.chartsAreaChartAmountDay = this.chartsAreaChartAmountDay.filter((el) => {
      return el.value !== 0;
    });

    let convertDDMMYYYYtoYYYYDDMM = (date) => {
      let tempDate = this.DDMMYYYtoYYYYDDMMconvert(date);
      return (new Date(tempDate)).getTime();
    }

    let tempArr = [];
    let tempArr2 = [];

    if (multiselectRange === "Date range") {
      this.uniqueValuesDateObj.forEach((elem, index) => {
        if (convertDDMMYYYYtoYYYYDDMM(elem.name) >= convertDDMMYYYYtoYYYYDDMM(dateStart) && convertDDMMYYYYtoYYYYDDMM(elem.name) <= convertDDMMYYYYtoYYYYDDMM(dateEnd)) {
          tempArr.push(elem);
        }
      })
      this.uniqueValuesDateObj = tempArr;

      this.chartsAreaChartAmountDay.forEach((elem, index) => {
        if (convertDDMMYYYYtoYYYYDDMM(elem.name) >= convertDDMMYYYYtoYYYYDDMM(dateStart) && convertDDMMYYYYtoYYYYDDMM(elem.name) <= convertDDMMYYYYtoYYYYDDMM(dateEnd)) {
          tempArr2.push(elem);
        }
      })
      this.chartsAreaChartAmountDay = tempArr2;
    }

    this.chartsAreaChartTransactionsDay = [{
      "name": "No. of Transactions",
      "series": this.uniqueValuesDateObj
    }];

    this.chartsAreaChartAmountDay = [{
      "name": "Amount of Transactions",
      "series": this.chartsAreaChartAmountDay
    }];

    objToArrayUnique.forEach(elem => {
      this.chartsAreaChartAmountDay[0].series.forEach(e => {
        if (elem[1].Date === e.name) {
          this.amountTransactionsByDayWeek.push({
            name: elem[1].Day,
            value: e.value
          });
        }
      });
    });

    this.amountTransactionsByDayWeek.forEach((element) => {
      if (element.name === "Monday")
      this.chartsBarVerticalAmountDay[0].value += element.value;
      if (element.name === "Tuesday")
      this.chartsBarVerticalAmountDay[1].value += element.value;
      if (element.name === "Wednesday")
      this.chartsBarVerticalAmountDay[2].value += element.value;
      if (element.name === "Thursday")
      this.chartsBarVerticalAmountDay[3].value += element.value;
      if (element.name === "Friday")
      this.chartsBarVerticalAmountDay[4].value += element.value;
      if (element.name === "Saturday")
      this.chartsBarVerticalAmountDay[5].value += element.value;
      if (element.name === "Sunday")
      this.chartsBarVerticalAmountDay[6].value += element.value;
    })

    let saltchartsLineChartTransactionsOperator = [];
    let sunrisechartsLineChartTransactionsOperator = [];
    let swisscomchartsLineChartTransactionsOperator = [];
    let twintchartsLineChartTransactionsOperator = [];

    this.chartsLineChartTransactionsOperator[0].series.forEach(function(a) {
      if (!this[a.name]) {
        this[a.name] = {
          name: a.name,
          value: 0
        };
        saltchartsLineChartTransactionsOperator.push(this[a.name]);
      }
      this[a.name].value += a.value;
    }, Object.create(null));

    this.chartsLineChartTransactionsOperator[1].series.forEach(function(a) {
      if (!this[a.name]) {
        this[a.name] = {
          name: a.name,
          value: 0
        };
        sunrisechartsLineChartTransactionsOperator.push(this[a.name]);
      }
      this[a.name].value += a.value;
    }, Object.create(null));

    this.chartsLineChartTransactionsOperator[2].series.forEach(function(a) {
      if (!this[a.name]) {
        this[a.name] = {
          name: a.name,
          value: 0
        };
        swisscomchartsLineChartTransactionsOperator.push(this[a.name]);
      }
      this[a.name].value += a.value;
    }, Object.create(null));

    this.chartsLineChartTransactionsOperator[3].series.forEach(function(a) {
      if (!this[a.name]) {
        this[a.name] = {
          name: a.name,
          value: 0
        };
        twintchartsLineChartTransactionsOperator.push(this[a.name]);
      }
      this[a.name].value += a.value;
    }, Object.create(null));

    this.chartsLineChartTransactionsOperator[0].series = saltchartsLineChartTransactionsOperator;
    this.chartsLineChartTransactionsOperator[1].series = sunrisechartsLineChartTransactionsOperator;
    this.chartsLineChartTransactionsOperator[2].series = swisscomchartsLineChartTransactionsOperator;
    this.chartsLineChartTransactionsOperator[3].series = twintchartsLineChartTransactionsOperator;

    this.chartsLineChartTransactionsOperator = [...this.chartsLineChartTransactionsOperator];

    // LINE CHART END
    let saltchartsLineChartAmountDaily = [];
    let sunrisechartsLineChartAmountDaily = [];
    let swisscomchartsLineChartAmountDaily = [];
    let twintchartsLineChartAmountDaily = [];


    chartsLineChartAmountDaily[0].series.forEach(function(a) {
      if (!this[a.name]) {
        this[a.name] = {
          name: a.name,
          value: 0
        };
        saltchartsLineChartAmountDaily.push(this[a.name]);
      }
      this[a.name].value += a.value;
    }, Object.create(null));

    chartsLineChartAmountDaily[1].series.forEach(function(a) {
      if (!this[a.name]) {
        this[a.name] = {
          name: a.name,
          value: 0
        };
        sunrisechartsLineChartAmountDaily.push(this[a.name]);
      }
      this[a.name].value += a.value;
    }, Object.create(null));

    chartsLineChartAmountDaily[2].series.forEach(function(a) {
      if (!this[a.name]) {
        this[a.name] = {
          name: a.name,
          value: 0
        };
        swisscomchartsLineChartAmountDaily.push(this[a.name]);
      }
      this[a.name].value += a.value;
    }, Object.create(null));

    chartsLineChartAmountDaily[3].series.forEach(function(a) {
      if (!this[a.name]) {
        this[a.name] = {
          name: a.name,
          value: 0
        };
        twintchartsLineChartAmountDaily.push(this[a.name]);
      }
      this[a.name].value += a.value;
    }, Object.create(null));

    chartsLineChartAmountDaily[0].series = saltchartsLineChartAmountDaily;
    chartsLineChartAmountDaily[1].series = sunrisechartsLineChartAmountDaily;
    chartsLineChartAmountDaily[2].series = swisscomchartsLineChartAmountDaily;
    chartsLineChartAmountDaily[3].series = twintchartsLineChartAmountDaily;

    this.chartsLineChartAmountDaily = [...chartsLineChartAmountDaily];
    // LINE CHART END

    this.uniqueValuesDateObj = this.uniqueValuesDateObj.filter((el) => {
      return el.value !== 0;
    });
    this.chartsAreaChartAmountDay = this.chartsAreaChartAmountDay.filter((el) => {
      return el.value !== 0;
    });

    this.priceAverage = this.priceTotal / this.uniqueValuesDateObj.length;
    this.transactionsAverage = this.transactionsTotal / this.filterResults.length;
  }


  // @param type - input from date range filter
  // @param event -  data from material including date from and date to
  // @param multiselectRange  -  set by default to 1
  // @return filterDataSource - filter @param event data for selected range for "Standard Payments" type
  // @return filterVoucherDataSource - filter @param event data for selected range for "Voucher Payments" type

  addEventFilterMonth(type: any, event, multiselectRange) {
    this.uniqueValuesDate = [];
    this.uniqueValuesDevice = [];
    this.uniqueValuesDateObj = [];
    this.chartsAreaChartAmountDay = [];
    this.chartsBarHorizontalOperatorTotal = [];
    this.chartsBarVerticalAmountOperator = [];

    let rangeSelect = 1;
    multiselectRange = "Date range";

    let switchDates = (a) => {
      switch (a) {
        case "Jan":
          return "01";
          break;
        case "Feb":
          return "02";
          break;
        case "Mar":
          return "03";
          break;
        case "Apr":
          return "04";
          break;
        case "May":
          return "05";
          break;
        case "Jun":
          return "06";
          break;
        case "Jun":
          return "07";
          break;
        case "Aug":
          return "08";
          break;
        case "Sep":
          return "09";
          break;
        case "Oct":
          return "10";
          break;
        case "Nov":
          return "11";
          break;
        case "Dec":
          return "12";
          break;
      }
    }

    let dtStartDateString = (event.value.begin as any).toString();
    let dtEndDateString = (event.value.end as any).toString();

    let dtStart = dtStartDateString.slice(8, 10) + '.' + switchDates(dtStartDateString.slice(4, 7)) + '.' + dtStartDateString.slice(11, 15);
    let dtEnd = dtEndDateString.slice(8, 10) + '.' + switchDates(dtEndDateString.slice(4, 7)) + '.' + dtEndDateString.slice(11, 15);

    this.filterDataSource(dtStart, dtEnd, rangeSelect, multiselectRange);
    this.filterVoucherDataSource(dtStart, dtEnd);
  }


  // @param from - start date from selected date range
  // @param to -  end date from selected date range
  // @return chartsBarVertical2DVoucherPayments - Voucher Payments ( SMS & Twint ) grouped vertical bar chart
  // @return chartsBarVerticalVoucherPayments - Voucher Payments ( SMS & Twint ) stacked vertical bar chart

  filterVoucherDataSource(from, to) {
    // FILTER SMS
    let storageValuesSMS = JSON.parse(localStorage.getItem("smsDataMonths"));
    let storageValuesTwint = JSON.parse(localStorage.getItem("twintDataMonths"));

    if (storageValuesSMS)
      this.selectaVoucherSMS = storageValuesSMS;

    if (storageValuesTwint)
      this.selectaVoucherTwint = storageValuesTwint;

    this.filterResultsVoucherSMS = this.selectaVoucherSMS.filter(element => {
      return element.Date >= from && element.Date <= to;
    });

    this.filterResultsVoucherTwint = this.selectaVoucherTwint.filter(
      element => {
        return element.Date >= from && element.Date <= to;
      }
    );

    this.chartsBarVertical2DVoucherPayments = [];
    this.chartsBarVerticalVoucherPayments = [];
    groupedVerticalBarChart[0].series[0].value = 0;
    groupedVerticalBarChart[0].series[1].value = 0;
    groupedVerticalBarChart[1].series[0].value = 0;
    groupedVerticalBarChart[1].series[1].value = 0;

    stackedVerticalBarChart[0].series[0].value = 0;
    stackedVerticalBarChart[0].series[1].value = 0;

    this.filterResultsVoucherSMS.forEach(elem => {
      if (elem.Date >= from && elem.Date <= to) {

        groupedVerticalBarChart[0].series[0].value =
          groupedVerticalBarChart[0].series[0].value + elem.Charged;
        groupedVerticalBarChart[0].series[1].value =
          groupedVerticalBarChart[0].series[1].value + elem.Voucher;


        stackedVerticalBarChart[0].series[0].value =
          stackedVerticalBarChart[0].series[0].value + elem.Productprice;
      }
    });

    this.filterResultsVoucherTwint.forEach(elem => {
      if (elem.Date >= from && elem.Date <= to) {

        groupedVerticalBarChart[1].series[0].value =
          groupedVerticalBarChart[1].series[0].value + elem.Charged;
        groupedVerticalBarChart[1].series[1].value =
          groupedVerticalBarChart[1].series[1].value + elem.Voucher;


        stackedVerticalBarChart[0].series[1].value =
          stackedVerticalBarChart[0].series[1].value + elem.Productprice;
      }
    });

    this.chartsBarVertical2DVoucherPayments = [...groupedVerticalBarChart];
    this.chartsBarVerticalVoucherPayments = [...stackedVerticalBarChart];
  }

  public vendingDataMonthsOctoberFiltered = [];

  groupedChartSMSData = [];
  groupedChartTwintData = [];

  public csvFile = [];

  private getCSVVendingRefresh(res) {
    this.csvFile = res;
  }

  private getCSVSmsRefresh(res) {
    this.csvFile = res;
  }

  private getCSVTwintRefresh(res) {
    this.csvFile = res;
  }

  subsriptionCSVVendingData: Subscription;
  subsriptionCSVSmsData: Subscription;
  subsriptionCSVTwintData: Subscription;

  // VENDING DATA - CSV2JSON CONVERTER
  public records: any[] = [];
  @ViewChild('csvReader', {
    static: false
  }) csvReader: any;
  file;

  ngOnInit() {

    let rangeSelect = "single";
    let multiselectRange = 2;

    if (localStorage.getItem("vendingDataMonths") === null) {
      this.vendingDataMonthsSelect = vendingDataMonthsJanuary;
      this.getAllDaysFromMonth(this.vendingDataMonthsSelect, rangeSelect, multiselectRange);
      this.vendingDataMonthsSelect = [];
    } else {
      this.vendingDataMonthsSelect = [];
      this.storageValues.forEach((element, index) => {
        if (element.Date.slice(3, 5) === "0" + this.matOptionMonth)
          this.vendingDataMonthsSelect.push(element)
      });
      this.getAllDaysFromMonth(this.vendingDataMonthsSelect, rangeSelect, multiselectRange);
    }

    // VENDING DATA

    const HttpVending = new XMLHttpRequest();
    const urlVending = "http://smarpaysrv-test.azurewebsites.net/VendingDashboard/data/vending_2020.csv";
    HttpVending.open("GET", urlVending);
    HttpVending.send();

    HttpVending.onreadystatechange = () => {
        let csvData = HttpVending.responseText;

        let csvRecordsArray = ( < string > csvData).split(/\r\n|\n/);

        let headers = ( < string > csvRecordsArray[0]).split(';');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
          headerArray.push(headers[j]);
        }

        //let headersRow = getHeaderArray(csvRecordsArray)

        let csvArrVending = [];

        for (let i = 1; i < csvRecordsArray.length; i++) {
          let curruntRecord = ( < any > csvRecordsArray[i]).split(';');
          if (curruntRecord.length == 6) {
            let csvRecord: VendingData = new VendingData();
            //csvRecord.Date = curruntRecord[0].trim();
            csvRecord.Date = (curruntRecord[0].trim()).slice(3, 5) + '.' + (curruntRecord[0].trim()).slice(0, 2) + '.' + (curruntRecord[0].trim()).slice(6, 10);
            csvRecord.Day = curruntRecord[1].trim();
            csvRecord.Price = curruntRecord[2].trim();
            csvRecord.Operator = curruntRecord[3].trim();
            csvRecord.Status = curruntRecord[4].trim();
            csvRecord.Count = curruntRecord[5].trim();
            csvArrVending.push(csvRecord);
          }
        }

        localStorage.setItem('vendingDataMonths', JSON.stringify(csvArrVending));
    }


    // SMS DATA
    const HttpSMS = new XMLHttpRequest();
    const urlSMS = "http://smarpaysrv-test.azurewebsites.net/VendingDashboard/data/voucher_sms_2020.csv";
    HttpSMS.open("GET", urlSMS);
    HttpSMS.send();

    HttpSMS.onreadystatechange = () => {
        let csvData = HttpSMS.responseText;

        let csvRecordsArray = ( < string > csvData).split(/\r\n|\n/);

        let headers = ( < string > csvRecordsArray[0]).split(';');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
          headerArray.push(headers[j]);
        }

        //let headersRow = getHeaderArray(csvRecordsArray);

        let csvArrSMS = [];

        for (let i = 1; i < csvRecordsArray.length; i++) {
          let curruntRecord = ( < any > csvRecordsArray[i]).split(';');
          if (curruntRecord.length == 6) {
            let csvRecord: SelectaData = new SelectaData();
            csvRecord['SMS-ID'] = Number(curruntRecord[0].trim());
            csvRecord.Objektnr = curruntRecord[1].trim();
            csvRecord.Productprice = Number(curruntRecord[2].trim());
            csvRecord.Date = (curruntRecord[3].trim()).slice(8, 10) + '.' + (curruntRecord[3].trim()).slice(5, 7) + '.' + (curruntRecord[3].trim()).slice(0, 4);
            csvRecord.Charged = Number(curruntRecord[4].trim());
            csvRecord.Voucher = Number(curruntRecord[5].trim());
            csvArrSMS.push(csvRecord);
          }
        }

        localStorage.setItem('smsDataMonths', JSON.stringify(csvArrSMS));
    }

    // TWINT DATA
    const HttpTWINT = new XMLHttpRequest();
    const urlTWINT = "http://smarpaysrv-test.azurewebsites.net/VendingDashboard/data/voucher_twint_2020.csv";
    HttpTWINT.open("GET", urlTWINT);
    HttpTWINT.send();

    HttpTWINT.onreadystatechange = () => {
        let csvData = HttpTWINT.responseText;

        let csvRecordsArray = ( < string > csvData).split(/\r\n|\n/);

        let headers = ( < string > csvRecordsArray[0]).split(';');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
          headerArray.push(headers[j]);
        }

        //let headersRow = getHeaderArray(csvRecordsArray);

        let csvArrTwint = [];

        for (let i = 1; i < csvRecordsArray.length; i++) {
          let curruntRecord = ( < any > csvRecordsArray[i]).split(';');
          if (curruntRecord.length == 6) {
            let csvRecord: SelectaData = new SelectaData();
            csvRecord['SMS-ID'] = Number(curruntRecord[0].trim());
            csvRecord.Objektnr = curruntRecord[1].trim();
            csvRecord.Productprice = Number(curruntRecord[2].trim());
            csvRecord.Date = (curruntRecord[3].trim()).slice(8, 10) + '.' + (curruntRecord[3].trim()).slice(5, 7) + '.' + (curruntRecord[3].trim()).slice(0, 4);
            csvRecord.Charged = Number(curruntRecord[4].trim());
            csvRecord.Voucher = Number(curruntRecord[5].trim());
            csvArrTwint.push(csvRecord);
          }
        }

        localStorage.setItem('twintDataMonths', JSON.stringify(csvArrTwint));
    }
  }
}
