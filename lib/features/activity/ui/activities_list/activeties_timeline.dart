import 'package:amplify_trips_planner/common/navigation/router/routes.dart';
import 'package:amplify_trips_planner/common/utils/date_time_formatter.dart';
import 'package:amplify_trips_planner/features/activity/ui/activity_category_icon.dart';
import 'package:amplify_trips_planner/models/ModelProvider.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:timeline_tile/timeline_tile.dart';

class ActivitiesTimeline extends StatelessWidget {
  const ActivitiesTimeline({
    super.key,
    required this.activities,
  });

  final List<Activity> activities;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(activities.length, (index) {
        final isEven = index % 2 == 0;
        return Row(
          mainAxisSize: MainAxisSize.max,
          children: [
            if (!isEven)
              Expanded(
                child: InkWell(
                  onTap: () => context.goNamed(
                    AppRoute.activity.name,
                    pathParameters: {'id': activities[index].id},
                  ),
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 15),
                    child: ActivityCategoryIcon(
                      activityCategory: activities[index].category,
                    ),
                  ),
                ),
              ),
            Expanded(
              child: TimelineTile(
                alignment: isEven ? TimelineAlign.start : TimelineAlign.end,
                indicatorStyle: const IndicatorStyle(
                  width: 20, // Size of the dot
                  color: Colors.blue, // Replace with Theme.of(context).primaryColor if needed
                  padding: EdgeInsets.all(8),
                ),
                endChild: isEven
                    ? buildContent(context, index)
                    : null, // Content after line for start alignment
                startChild: !isEven
                    ? buildContent(context, index)
                    : null, // Content before line for end alignment
                isFirst: index == 0,
                isLast: index == activities.length - 1,
              ),
            ),
            if (isEven)
              Expanded(
                child: InkWell(
                  onTap: () => context.goNamed(
                    AppRoute.activity.name,
                    pathParameters: {'id': activities[index].id},
                  ),
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 15),
                    child: ActivityCategoryIcon(
                      activityCategory: activities[index].category,
                    ),
                  ),
                ),
              ),
          ],
        );
      }),
    );
  }

  Widget buildContent(BuildContext context, int index) {
    return InkWell(
      onTap: () => context.goNamed(
        AppRoute.activity.name,
        pathParameters: {'id': activities[index].id},
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Text(
              activities[index].activityName,
              style: Theme.of(context).textTheme.titleMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 5),
            Text(
              activities[index].activityDate.getDateTime().format('yyyy-MM-dd'),
              style: Theme.of(context).textTheme.bodySmall,
            ),
            Text(
              activities[index].activityTime!.getDateTime().format('hh:mm a'),
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }
}