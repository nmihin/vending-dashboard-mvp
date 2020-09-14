// CORE
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HostListener } from "@angular/core";

// MATERIAL
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

// MOMENT
import * as moment from "moment";

// NOTIFICATION
import { NotifierService } from "angular-notifier";

// AUTHENTIFICATION
import { AuthenticationService } from "../../services/authentication.service";

// GET DATA
import { MachinesData } from "../../models/dataInterfaceMachines";
import { DataService } from "../../services/data.service";
import { machinesData } from "../../data/machinesData.dataCopy";

// MAPBOX
import * as mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

@Component({
  selector: "app-section-areas",
  templateUrl: "./section-areas.component.html",
  styleUrls: ["./section-areas.component.scss"]
})
export class SectionAreasComponent implements OnInit {
  constructor(
    public notifier: NotifierService,
    public authenticationService: AuthenticationService,
    public dataService: DataService
  ) {
    Object.assign(this, { machinesData });
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }
  events: string[] = [];
  opened: boolean;
  selected = "option2";
  layoutOrientation = "horizontal";
  currentUser: any;
  public _sensors = [];
  public _parkingSpaces = [];
  public _barriers = [];
  public _connectivity = [];
  public _parkingAreas = [];
  public _groupedEvents = [];
  public _eventsChart = [];
  public _parkingSpacesAreas = [];
  public _summary = [];
  public _alarms = [];
  public tableData = [];
  public mapTableData = [];
  public mapTableDataClusterOK = [];
  public mapTableDataClusterWARNING = [];
  public mapTableDataClusterERROR = [];

  earthquakes: object;

  machinesData: any[];
  dataSource: MatTableDataSource<MachinesData>;

  // MOBILE CHECK
  isMobile = false;

  displayedColumns: string[] = ["ObjektNummer", "City", "Address", "StatusCode", "transaction_errorcode"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  okMachines = 0;
  warningMachines = 0;
  errorMachines = 0;

  points_OK = {
    type: "FeatureCollection",
    features: this.mapTableDataClusterOK
  };

  points_WARNING = {
    type: "FeatureCollection",
    features: this.mapTableDataClusterWARNING
  };

  points_ERROR = {
    type: "FeatureCollection",
    features: this.mapTableDataClusterERROR
  };

  pointsPopupData = [];

  public tempArray;

  // CREATE MAP LAYERS
  createMapLayers(ds) {
    ds.forEach(element => {
      if (element.StatusCode === "WORKING") {
        this.mapTableDataClusterOK.push({
          type: "Feature",
          Latitude: element.Latitude,
          Longitude: element.Longitude,
          City: element.City,
          Address: element.Address,
          ObjektNummer: element.ObjektNummer,
          start_timestamp: element.start_timestamp,
          end_timestamp: element.end_timestamp,
          transaction_errorcode: element.transaction_errorcode,
          purchase_status: element.purchase_status,
          StatusCode: element.StatusCode,
          properties: {
            icon: "star",
            type: "circle",
            layout: {
              visibility: "visible"
            },
            paint: {
              "circle-radius": 8,
              "circle-color": "#87C830"
            }
          },
          geometry: {
            type: "Point",
            coordinates: [
              element.Longitude.replace(",", "."),
              element.Latitude.replace(",", ".")
            ]
          }
        });
      }
      if (element.StatusCode === "WARNING") {
        this.mapTableDataClusterWARNING.push({
          type: "Feature",
          Latitude: element.Latitude,
          Longitude: element.Longitude,
          City: element.City,
          Address: element.Address,
          ObjektNummer: element.ObjektNummer,
          start_timestamp: element.start_timestamp,
          end_timestamp: element.end_timestamp,
          transaction_errorcode: element.transaction_errorcode,
          purchase_status: element.purchase_status,
          StatusCode: element.StatusCode,
          properties: {
            icon: "star",
            type: "circle",
            layout: {
              visibility: "visible"
            },
            paint: {
              "circle-radius": 8,
              "circle-color": "#87C830"
            }
          },
          geometry: {
            type: "Point",
            coordinates: [
              element.Longitude.replace(",", "."),
              element.Latitude.replace(",", ".")
            ]
          }
        });
      }
      if (element.StatusCode === "ERROR") {
        this.mapTableDataClusterERROR.push({
          type: "Feature",
          Latitude: element.Latitude,
          Longitude: element.Longitude,
          City: element.City,
          Address: element.Address,
          ObjektNummer: element.ObjektNummer,
          start_timestamp: element.start_timestamp,
          end_timestamp: element.end_timestamp,
          transaction_errorcode: element.transaction_errorcode,
          purchase_status: element.purchase_status,
          StatusCode: element.StatusCode,
          properties: {
            icon: "star",
            type: "circle",
            layout: {
              visibility: "visible"
            },
            paint: {
              "circle-radius": 8,
              "circle-color": "#87C830"
            }
          },
          geometry: {
            type: "Point",
            coordinates: [
              element.Longitude.replace(",", "."),
              element.Latitude.replace(",", ".")
            ]
          }
        });
      }

      this.points_OK = {
        type: "FeatureCollection",
        features: this.mapTableDataClusterOK
      };

      this.points_WARNING = {
        type: "FeatureCollection",
        features: this.mapTableDataClusterWARNING
      };

      this.points_ERROR = {
        type: "FeatureCollection",
        features: this.mapTableDataClusterERROR
      };

    });
  }

  filterMachineStatus(filter) {

    if(filter!=="TOTAL"){
      this.tempArray = this.tableData.filter(function (machine) {
        return machine.StatusCode === filter;
      });
    }
    else{
      this.tempArray = this.tableData;
    }

    let ELEMENT_DATA: MachinesData[] = this.tempArray;
    this.dataSource = new MatTableDataSource<MachinesData>(ELEMENT_DATA);
  }

  // FILTER BY STRING
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.mapTableDataClusterOK = [];
    this.mapTableDataClusterWARNING = [];
    this.mapTableDataClusterERROR = [];

    this.createMapLayers(this.dataSource.filteredData);
  }
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    console.log("screen width:" + w);
    if (w < breakpoint) {
      this.layoutOrientation = "vertical";
      return true;
    } else {
      this.layoutOrientation = "horizontal";
      return false;
    }
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    (mapboxgl as typeof mapboxgl).accessToken =
      "pk.eyJ1IjoibGltYm83NzciLCJhIjoiY2pqZ3Q4b2I0MG1keDN2bGcxMnZkeHpwYyJ9.xzM2vWikDaCZyqP_yt7VVg";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/limbo777/ck5f8n7zg1pvf1jny2fr1d5d3",
      center: [7.8708971, 46.7822172],
      zoom: 6
    });

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken
      }),
      "top-left"
    );

    (mapboxgl as any).dataOK = this.points_OK.features;
    (mapboxgl as any).dataWARNING = this.points_WARNING.features;
    (mapboxgl as any).dataERROR = this.points_ERROR.features;

    map.on("load", function() {
      // DATA OK
      map.addSource("status_OK", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: (mapboxgl as any).dataOK
        }
      });

      map.addLayer({
        id: "status_OK",
        type: "circle",
        source: "status_OK",
        paint: {
          "circle-radius": 4,
          "circle-color": "#87c830"
        }
      });

      // DATA WARNING
      map.addSource("status_WARNING", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: (mapboxgl as any).dataWARNING
        }
      });

      map.addLayer({
        id: "status_WARNING",
        type: "circle",
        source: "status_WARNING",
        paint: {
          "circle-radius": 4,
          "circle-color": "#FF8C00"
        }
      });

      // DATA ERROR
      map.addSource("status_ERROR", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: (mapboxgl as any).dataERROR
        }
      });

      map.addLayer({
        id: "status_ERROR",
        type: "circle",
        source: "status_ERROR",
        paint: {
          "circle-radius": 4,
          "circle-color": "#f03b00"
        }
      });
    });
  }

  ngOnInit() {
    // SET STATUS CODE
    const setStatusCode = function(ping, timestamp) {
      let todayTimestamp = "2020-01-09 10:57:44";
      const date = moment(todayTimestamp);
      const dateEndDate = moment(timestamp);
      let dateInFormat = date.format("x");
      let end_timestamp = dateEndDate.format("x");
      let diff = Math.round(
        (parseInt(dateInFormat) - parseInt(end_timestamp)) / 3600000
      );
      let status = "WORKING";

      if (ping === "OK" && diff < 168 && diff > 24) status = "WORKING";
      if (ping === "NOK" && diff > 24 && diff < 168) status = "ERROR";
      if (ping === "NOK" && diff > 12 && diff < 24) status = "WARNING";

      return status;
    };

    // CREATE MAP LAYERS
    this.machinesData.forEach(element => {
      this.mapTableData.push({
        type: "Feature",
        Latitude: element.Latitude.replace(",", "."),
        Longitude: element.Longitude.replace(",", "."),
        City: element.City,
        Address: element.Address,
        ObjektNummer: element.ObjektNummer,
        start_timestamp: element.start_timestamp,
        end_timestamp: element.end_timestamp,
        transaction_errorcode: element.transaction_errorcode,
        purchase_status: element.purchase_status,
        StatusCode: setStatusCode(element.Ping, element.end_timestamp)
      });
      this.tableData.push({
        City: element.City,
        Address: element.Address,
        ObjektNummer: element.ObjektNummer,
        transaction_errorcode: element.transaction_errorcode,
        StatusCode: setStatusCode(element.Ping, element.end_timestamp)
      })
    });

    // INIT MAP LAYERS
    this.createMapLayers(this.mapTableData);

    // INIT TABLE DATA
    this.mapTableData.forEach(element => {
      if (element.StatusCode === "WORKING") this.okMachines++;
      if (element.StatusCode === "WARNING") this.warningMachines++;
      if (element.StatusCode === "ERROR") this.errorMachines++;
    });

    //const noLatLon = ({ type, Latitude, Longitude, start_timestamp, end_timestamp, purchase_status, ...rest }) => rest

    let ELEMENT_DATA: MachinesData[] = this.tableData;
    this.dataSource = new MatTableDataSource<MachinesData>(ELEMENT_DATA);

    //machinesData: any[];
    // Mobile detector - frontend UI only
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }
}
