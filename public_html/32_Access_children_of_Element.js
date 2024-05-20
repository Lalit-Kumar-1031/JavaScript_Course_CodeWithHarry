/*
<!DOCTYPE html>
<html>
    <head>
        <title>This is Lalit</title>
    </head>
    <body>
        <div>
            <h1>Brother</h1>
            <h2>Sister</h2>
        </div>
    </body>
</html>

1)Child Node -> head and body are the child node of the html tag.
2)Descendant Node -> div,h1 and h2 are the descendant node of the html.

console.log(document.body.firstChild);  // it give first child of body
console.log(document.body.lastChild);  // it give last child of body
console.log(document.body.childNodes);  // it give all children of body tag in form of node list 

 
let arr=Array.from(document.body.childNodes);
console.log(arr);

Note:- If you want to convert a node list into a array then use Array.from();



*/

/*

import 'dart:convert';
import 'package:e_charitra/Bloc/UserData/user_data_bloc.dart';
import 'package:e_charitra/constant/Global_variable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:http/http.dart' as http;
import 'package:badges/badges.dart' as badges;
import 'package:colorful_safe_area/colorful_safe_area.dart';
import 'package:e_charitra/Services/Notification_Services/Notification_Service.dart';
import 'package:e_charitra/constant/contant_Colors.dart';
import 'package:e_charitra/controllers/get_info.dart';
import 'package:e_charitra/controllers/phone_number_api.dart';
import 'package:e_charitra/env.dart';
import 'package:e_charitra/main.dart';
import 'package:e_charitra/model/Notification_model.dart';
import 'package:e_charitra/view/bottomBarScreens/Notification_Screen.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:gradient_borders/box_borders/gradient_box_border.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:share_plus/share_plus.dart';
import '../../Bloc/UserData/user_data_event.dart';
import '../../model/userdatamodel.dart';
import 'package:flutter/services.dart';

class NavHomeScreen extends StatefulWidget {
  const NavHomeScreen({Key? key}) : super(key: key);

  @override
  _NavHomeScreenState createState() => _NavHomeScreenState();
}

UserData? fetchedUserData;

class _NavHomeScreenState extends State<NavHomeScreen> {
  List<NotificationModel> new_Notifications = [];

  UserDataBloc _userDataBloc = UserDataBloc();

  NotificationServices notificationServices = NotificationServices();

  final userDataController = Get.find<UserDataController>();
  bool isLoading = true;
  int workingMonths = 0;
  late int totalcompany;
  bool isToggled = false;
  bool status = false;
  int index1 = 0;
  bool current = false;

  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey();

  int parseMonth(String monthString) {
    switch (monthString.toLowerCase()) {
      case 'jan':
        return 1;
      case 'feb':
        return 2;
      case 'mar':
        return 3;
      case 'apr':
        return 4;
      case 'may':
        return 5;
      case 'jun':
        return 6;
      case 'jul':
        return 7;
      case 'aug':
        return 8;
      case 'sep':
        return 9;
      case 'oct':
        return 10;
      case 'nov':
        return 11;
      case 'dec':
        return 12;
      default:
        throw FormatException('Invalid month string: $monthString');
    }
  }

  DateTime parseDateString(String dateString) {
    List<String> parts = dateString.split(' ');
    int year = int.parse(parts[1]);
    int month = parseMonth(parts[0]);
    return DateTime(year, month);
  }

  String formatDate(DateTime date) {
    return '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }

  String getTotalWorkingTime(String start, String end, String presented) {
    String startDateString = start;
    late String endDateString;

    if (presented == "true") {
      // Get the current date and time
      DateTime now = DateTime.now();
      endDateString = DateFormat('MMM yyyy').format(now);
    } else {
      endDateString = end;
    }

    print('Date ----------------------1');
    print(endDateString);
    print(startDateString);
    print(presented);

    // Parse the start and end dates into DateTime objects
    DateTime startDate = parseDateString(startDateString);
    DateTime endDate = parseDateString(endDateString);

    print('Start date after parse -------$startDate');
    print('end date after parse -------$endDate');

    Duration difference = endDate.difference(startDate);

    double totalYears = difference.inDays / 365.0;

    int years = totalYears.floor();
    int months = ((totalYears - years) * 12).round();

    return years == 0 ? "$months Months" : "$years Years $months Months";
  }

  //get current company index
  void getCurrentIndex(List<CompanyDetail> comapanylist) {
    int length = comapanylist.length;
    for (int i = 0; i < length; i++) {
      if (comapanylist[i].presented == 'true') {
        index1 = i;
        current = true;
        break;
      }
    }
  }

  fetchData() async {
    await UserDataController().fetchUserData(context).then((value) {
      setState(() {
        fetchedUserData = value;
        isLoading = false;
      });
    });
  }

  Future<List<NotificationModel>> _fetchNotificationsFromApi() async {
    await GlobalData.getTokenFromLocalStorage();
    try {
      final response = await http.get(
        Uri.parse("${Env.notification_apiUrl}/notification/fetch"),
        headers: {
          'Authorization': 'Bearer ${GlobalData.accessToken}',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = jsonDecode(response.body);
        final List<dynamic> results = data['results'];
        return results.map((item) => NotificationModel.fromJson(item)).toList();
      } else {
        final errorMessage =
            jsonDecode(response.body)['error']['message'] ?? 'Unknown error';
        throw Exception('Failed to load notifications: $errorMessage');
      }
    } catch (e) {
      print('Error fetching notifications: $e');
      throw Exception('Failed to load notifications: ${e.toString()}');
    }
  }

  // Method to copy text to the clipboard
  void copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
  }

  Future<void> _requestNotificationPermission() async {
    final status = await Permission.notification.request();

    if (status.isDenied) {
      showDialog(
        context: context,
        builder: (BuildContext context) => AlertDialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
          title: Text(" Allow Notification"),
          content: Text(
              "Please allow notification permissions to receive notifications."),
          actions: <Widget>[
            TextButton(
              child: Text("Allow"),
              onPressed: () async {
                Navigator.of(context).pop();
                //_openNotificationSettings();
                openAppSettings();
                //OpenSettings.openAppNotificationSettings();
                final newStatus = await Permission.notification.request();
                if (newStatus.isGranted) {
                  // Notification permission granted, you can proceed with sending notifications
                  print("Notification permission granted");
                  setState(
                      () {}); // Trigger a rebuild to reflect the permission change
                } else {
                  // Notification permission denied
                  print("Notification permission denied");
                }
              },
            ),
          ],
        ),
      );
    }
  }

  @override
  void initState() {
    fetchData();
    _userDataBloc.add(InitialUserDataFetchEvent());

    _requestNotificationPermission();
    notificationServices.requestNotificationPermission();
    notificationServices.forgroundMessage();
    notificationServices.firebaseInit(context);
    notificationServices.setupInteractMessage(context);
    notificationServices.isTokenRefresh();
    notificationServices.getDeviceToken().then((value) {
      if (kDebugMode) {
        print('device token');
        print(value);
      }
    });
    super.initState();
  }

  int getcurrentCompanyIndex(int total) {
    for (int i = 0; i < total; i++) {
      print("Present val--------");
      print(fetchedUserData!.data.companyDetails[i].presented);
      if (fetchedUserData!.data.companyDetails[i].presented == 'true') {
        return i;
      }
    }
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    _fetchNotificationsFromApi().then(
      (value) {
        setState(() {
          new_Notifications = value;
        });
      },
    );

    print("API Data ----------------");
    //print(fetchedUserData!.data.certificateDetails[0].organizationName);
    getCurrentIndex(fetchedUserData!.data.companyDetails);
    String totalTiming = getTotalWorkingTime(
        fetchedUserData!.data.companyDetails[index1].startDate,
        fetchedUserData!.data.companyDetails[index1].endDate.toString(),
        fetchedUserData!.data.companyDetails[index1].presented.toString());

    print("total working time:-   $totalTiming");

    String? companyName =
        fetchedUserData?.data.companyDetails[index1].companyName ?? "";
    String initialLetter =
        companyName.isNotEmpty ? companyName[0].toUpperCase() : "";

    print("New Notification-----------------------");
    print(new_Notifications.length);
    print("old Notification-----------------------");
    print(GlobalVariable.old_Notifications.length);

    return ColorfulSafeArea(
      color: Colors.white,
      child: Scaffold(
        body: isLoading
            ? const SpinKitSpinningLines(
          color: kPrimaryColor,
          size: 50.0,
        )
            : Container(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/images/HomeScreen.png"),
              fit: BoxFit.cover,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: MediaQuery.of(context).size.width * 0.9,
                height: MediaQuery.of(context).size.height * 0.125,
                //color: Colors.yellow,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          height: 8,
                        ),
                        RichText(
                          text: TextSpan(
                            //style: DefaultTextStyle.of(context).style,
                            children: [
                              const TextSpan(
                                text: 'Welcome, ',
                                style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 28,
                                    fontWeight: FontWeight.w600),
                              ),
                              TextSpan(
                                text: fetchedUserData!
                                    .data.contactDetails!.fullName
                                    ?.split(' ')[0] ??
                                    '',
                                style: TextStyle(
                                  //color: kPrimaryColor,
                                  fontSize: 28,
                                  fontWeight: FontWeight.w800,
                                  foreground: Paint()
                                    ..shader = LinearGradient(
                                      colors: [
                                        Color(0xFF008472),
                                        Color(0xFF2C4A6C)
                                      ],
                                    ).createShader(
                                      Rect.fromLTWH(0.0, 0.0, 200.0,
                                          70.0), // Specify text bounds
                                    ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Row(
                          children: [
                            InkWell(
                              onTap: () {
                                String textToCopy = fetchedUserData!
                                    .data.charitraId
                                    .toString();
                                copyToClipboard(textToCopy);

                                //Charitra Id copy event
                                MyApp.analytics
                                    .logEvent(name: 'Copy_CharitraId');

                                ScaffoldMessenger.of(context)
                                    .showSnackBar(
                                  const SnackBar(
                                    content:
                                    Text('Text copied to clipboard'),
                                  ),
                                );
                              },
                              child: Text(
                                'Charitra ID: ${fetchedUserData!.data.charitraId.toString()}',
                                style: const TextStyle(
                                    color: Colors.black87,
                                    fontWeight: FontWeight.w500,
                                    fontSize: 12),
                              ),
                            ),
                            ShaderMask(
                              shaderCallback: (Rect bounds) {
                                return const LinearGradient(
                                  begin: Alignment.bottomRight,
                                  end: Alignment.topLeft,
                                  colors: [
                                    Color(0xFF008472),
                                    Color(0xFF2C4A6C),
                                  ], // Gradient colors
                                ).createShader(bounds);
                              },
                              child: IconButton(
                                  onPressed: () {
                                    String textToCopy = fetchedUserData!
                                        .data.charitraId
                                        .toString();
                                    copyToClipboard(textToCopy);

                                    //Charitra Id copy event
                                    MyApp.analytics.logEvent(
                                        name: 'Copy_CharitraId');

                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(
                                      const SnackBar(
                                        content: Text(
                                            'Text copied to clipboard'),
                                      ),
                                    );
                                  },
                                  icon: const Icon(
                                    Icons.file_copy_rounded,
                                    color: kPrimaryColor,
                                    size: 17,
                                  )),
                            ),
                          ],
                        )
                      ],
                    ),
                    Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        color: Colors.white,
                      ),
                      child: ShaderMask(
                        shaderCallback: (Rect bounds) {
                          return const LinearGradient(
                            begin: Alignment.bottomRight,
                            end: Alignment.topLeft,
                            colors: [
                              Color(0xFF008472),
                              Color(0xFF2C4A6C),
                            ], // Gradient colors
                          ).createShader(bounds);
                        },
                        child: badges.Badge(
                          showBadge: new_Notifications.length==GlobalVariable.old_Notifications.length?false:true,
                          child: IconButton(
                            icon: const Icon(
                              Icons.notifications,
                              color: kPrimaryColor,
                              size: 35,
                            ),
                            onPressed: () {
                              Get.to(NotificationScreen());
                            },
                          ),
                        ),
                      ),
                    )
                  ],
                ),
              ),
              current == true
                  ? Container(
                width: MediaQuery.of(context).size.width * 0.9,
                height: MediaQuery.of(context).size.height * 0.17,
                padding: EdgeInsets.all(7),
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                        color: kGrayHintColor.withOpacity(0.4),
                        width: 0.5)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Container(
                      width:
                      MediaQuery.of(context).size.width * 0.35,
                      child: Column(
                        mainAxisAlignment:
                        MainAxisAlignment.spaceAround,
                        crossAxisAlignment:
                        CrossAxisAlignment.start,
                        children: [
                          ShaderMask(
                            shaderCallback: (Rect bounds) {
                              return const LinearGradient(
                                begin: Alignment.bottomRight,
                                end: Alignment.topLeft,
                                colors: [
                                  Color(0xFF008472),
                                  Color(0xFF2C4A6C),
                                ], // Gradient colors
                              ).createShader(bounds);
                            },
                            child: const Text(
                              "Current Job:",
                              style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: kPrimaryColor),
                            ),
                          ),
                          SizedBox(
                            height: 25,
                          ),
                          Container(
                            height: 34,
                            width:
                            MediaQuery.of(context).size.width *
                                0.32,
                            decoration: BoxDecoration(
                              color: fetchedUserData
                                  ?.data
                                  .companyDetails![index1]
                                  .verifiedStatus ==
                                  true
                                  ? kPrimaryColor
                                  : Colors.grey.shade400
                                  .withOpacity(0.7),
                              border: Border.all(
                                color: fetchedUserData
                                    ?.data
                                    .companyDetails![index1]
                                    .verifiedStatus ==
                                    true
                                    ? kPrimaryColor
                                    : kGrayHintColor,
                              ),
                              borderRadius:
                              BorderRadius.circular(20),
                            ),
                            child: Row(
                              mainAxisAlignment:
                              MainAxisAlignment.center,
                              children: [
                                const Icon(
                                  Icons.verified,
                                  color: Colors.white,
                                  size: 17,
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                      left: 5),
                                  child: Text(
                                    fetchedUserData!
                                        .data
                                        .companyDetails![
                                    index1]
                                        .verifiedStatus ==
                                        true
                                        ? "Verified"
                                        : "Not Verified",
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13,
                                    ),
                                  ),
                                )
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                    Container(
                      width:
                      MediaQuery.of(context).size.width * 0.5,
                      //color: Colors.red,
                      child: Column(
                        mainAxisAlignment:
                        MainAxisAlignment.spaceEvenly,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          SizedBox(
                            width:
                            MediaQuery.of(context).size.width *
                                0.55,
                            child: Row(
                              mainAxisAlignment:
                              MainAxisAlignment.end,
                              children: [
                                Container(
                                  width: 22,
                                  height: 22,
                                  margin: const EdgeInsets.only(
                                      right: 7),
                                  decoration: const BoxDecoration(
                                    color: kPrimaryColor,
                                    shape: BoxShape.circle,
                                  ),
                                  child: Center(
                                    child: Text(
                                      initialLetter,
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 15,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                                fetchedUserData!
                                    .data
                                    .companyDetails[index1]
                                    .companyName
                                    .length <
                                    15
                                    ? Container(
                                  //color: Colors.red,
                                  width: fetchedUserData!
                                      .data
                                      .companyDetails[
                                  index1]
                                      .companyName
                                      .length *
                                      8,
                                  child: Text(
                                    fetchedUserData!
                                        .data
                                        .companyDetails[
                                    index1]
                                        .companyName,
                                    overflow:
                                    TextOverflow.ellipsis,
                                    //softWrap: false,
                                    style: const TextStyle(
                                        overflow: TextOverflow
                                            .ellipsis,
                                        fontSize: 17,
                                        fontWeight:
                                        FontWeight.w600,
                                        color: Colors.black),
                                  ),
                                )
                                    : Expanded(
                                  child: Container(
                                    //color: Colors.red,
                                    width: fetchedUserData!
                                        .data
                                        .companyDetails[
                                    index1]
                                        .companyName
                                        .length *
                                        8,
                                    child: Text(
                                      fetchedUserData!
                                          .data
                                          .companyDetails[
                                      index1]
                                          .companyName,
                                      overflow: TextOverflow
                                          .ellipsis,
                                      //softWrap: false,
                                      style: const TextStyle(
                                          overflow:
                                          TextOverflow
                                              .ellipsis,
                                          fontSize: 16,
                                          fontWeight:
                                          FontWeight.w600,
                                          color:
                                          Colors.black),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(
                            height: 12,
                          ),
                          Text(
                            fetchedUserData
                                ?.data
                                .companyDetails?[index1]
                                .jobTitle ??
                                "",
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                                fontSize: 15,
                                color: kGrayHintColor),
                          ),
                          SizedBox(
                            height: 2,
                          ),
                          Text(
                            totalTiming,
                            style: const TextStyle(
                                fontSize: 15,
                                color: kGrayHintColor),
                          )
                        ],
                      ),
                    )
                  ],
                ),
              )
                  : Container(
                width: MediaQuery.of(context).size.width * 0.9,
                height: MediaQuery.of(context).size.height * 0.17,
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                        color: kGrayHintColor.withOpacity(0.4),
                        width: 0.5)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container(
                        width: MediaQuery.of(context).size.width *
                            0.38,
                        child: const Text(
                          "Looking for new opportunity?",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 17,
                            //fontFamily: 'Outfit'
                          ),
                        )),
                    FlutterSwitch(
                      width:
                      MediaQuery.of(context).size.width * 0.4,
                      height:
                      MediaQuery.of(context).size.width * 0.1,
                      valueFontSize: 14.0,
                      toggleSize: 35.0,
                      value: status,
                      activeText: ' Open to Work',
                      inactiveText: ' Open to Work ',
                      activeColor: kPrimaryColor,
                      inactiveColor:
                      kGrayHintColor.withOpacity(0.6),
                      borderRadius: 30.0,
                      inactiveIcon: Icon(
                        Icons.done,
                        color: Colors.white,
                      ),
                      padding: 8.0,
                      showOnOff: true,
                      onToggle: (val) {
                        setState(() {
                          status = val;
                        });
                      },
                    ),
                  ],
                ),
              ),
              Container(
                width: MediaQuery.of(context).size.width * 0.9,
                height: MediaQuery.of(context).size.height * 0.453,
                //color: Colors.grey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  //crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    _getProgressIndicator(
                        fetchedUserData!.data.score.toDouble()),
                  ],
                ),
              ),
              Expanded(
                  child: Container(
                    width: MediaQuery.of(context).size.width * 0.9,
                    child: GestureDetector(
                      onTap: () {

                        String customString = '''
        Hello there! I'm ${fetchedUserData!.data.contactDetails.fullName}, and I'm thrilled to share my E-Charitra profile with you. 🚀Explore my professional journey, accolades, and achievements all in one place with my E-Charitra ID:  "${fetchedUserData!.data.charitraId}"\n
       🎯 With E-Charitra, you'll gain insights into my verified past experiences, performance evaluations, and more, providing you with a comprehensive view of my professional credibility.\n\n
       Thank you!!
      ''';
                        Share.share(customString);
                        MyApp.analytics.logEvent(name: 'Share_Profile');
                      },
                      child: Align(
                        alignment: Alignment.topCenter,
                        child: Container(
                          width: MediaQuery.of(context).size.width * 0.7,
                          height: MediaQuery.of(context).size.height * 0.07,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: [
                                Color(0xFF008472),
                                Color(0xFF2C4A6C),
                              ],
                              stops: [0.1866, 0.871],
                              transform: GradientRotation(124.94 *
                                  (3.141592653589793 /
                                      180)), // Convert degrees to radians
                            ),
                            color: kPrimaryColor,
                            borderRadius: BorderRadius.circular(42),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Padding(
                                padding: EdgeInsets.only(
                                  right: 10,
                                ),
                                child: Text(
                                  "Share your profile",
                                  style: TextStyle(
                                      fontSize: 16,
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold),
                                ),
                              ),
                              Icon(
                                Icons.share,
                                color: Colors.white,
                                size: 17,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  )),
            ],
          ),
        ),
      ),
    );
  }

  Widget _getProgressIndicator(double progress) {
    double normalizedProgress = progress.clamp(0, 1000) / 1000.0;
    return Container(
      // width: 170.0,
      // height: 170.0,
      margin: const EdgeInsets.only(top: 15, bottom: 10),
      decoration: const BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
        border: GradientBoxBorder(
          gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [kgreenGradientColorLeft, kgreenGradientColorRight]),
          width: 25,
        ),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.5,
            height: MediaQuery.of(context).size.width * 0.5,
            child: Transform.rotate(
              angle: 3,
              child: CircularProgressIndicator(
                value: normalizedProgress,
                strokeWidth: 11.0,
                strokeCap: StrokeCap.round,
                valueColor: AlwaysStoppedAnimation<Color>(kProgessColoe),
                backgroundColor: Colors.white,
                // duration: Duration(seconds: 2),
              ),
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "${progress.toInt()}",
                style: const TextStyle(
                  fontSize: 40.0,
                  color: kgreenGradientColorRight,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const Text(
                "Charitra Score",
                style: TextStyle(
                  fontSize: 22.0,
                  color: kgreenGradientColorRight,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}




*/