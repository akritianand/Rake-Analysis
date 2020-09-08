import sys, json
import xlsxwriter

def convert(date_time):
    format = '%b %d %Y %I:%M%p' # The format
    datetime_str = datetime.datetime.strptime(date_time, format)

    return datetime_str

if __name__ == '__main__':
    data = json.loads(sys.argv[1])

    workbook = xlsxwriter.Workbook('RakeAnalysis.xlsx')
    worksheet = workbook.add_worksheet()

    res = [
        ['S.No', 'Source', 'Mines', 'Rake No', 'RR No', 'Loading Date', 'Unloading Date', 'Sample Collection Date', 'Billed Grade', 'Total Quantity', 'ASH', 'VM', 'GCV(Kcal/Kg) - Cimfer', 'GCV(Kcal/Kg) - NPGC', 'Equilibrated Moisture', 'Total Moisture', 'Disputed by Cimfer', 'Disputed by NPGC', 'Equilibrated Moisture', 'ASH', 'VM', 'GCV(Kcal/Kg) - Cimfer', 'GCV(Kcal/Kg) - NPGC', 'Total Moisture', 'ASH', 'VM', 'GCV(Kcal/Kg)', 'Disputed by NPGC']
    ]

    worksheet.merge_range('I1:Y1', 'Sample')
    worksheet.merge_range('K2:P4', 'Loading End')
    worksheet.merge_range('Q2:Y2', 'Unloading End')
    worksheet.merge_range('Q3:U3', 'Equilibrated Moisture Basis')
    worksheet.merge_range('V3:Y3', 'Total Moisture Basis')

    index=1
    for d in data:
        res.append([index, d['source'], d['mines'], d['rake_no'], d['rr_no'], d['rake_loading_date'].split('T', 1)[0], d['rake_unloading_date'].split('T', 1)[0], d['sample_collection_date'].split('T', 1)[0], d['samples'][0]['billed_grade'], d['samples'][0]['total_quantity'], d['samples'][0]['loading_end']['ash'], d['samples'][0]['loading_end']['vm'], d['samples'][0]['loading_end']['gcv_cimfer'], d['samples'][0]['loading_end']['gcv_npgc'], d['samples'][0]['loading_end']['equilibrated_moisture'], d['samples'][0]['loading_end']['total_moisture'], d['samples'][0]['loading_end']['disputed_by_cimfer'], d['samples'][0]['loading_end']['disputed_lab'], d['samples'][0]['unloading_end']['equilibrated_basis']['equilibrated_moisture'], d['samples'][0]['unloading_end']['equilibrated_basis']['ash'], d['samples'][0]['unloading_end']['equilibrated_basis']['vm'], d['samples'][0]['unloading_end']['equilibrated_basis']['gcv_cimfer'], d['samples'][0]['unloading_end']['equilibrated_basis']['gcv_npgc'], d['samples'][0]['unloading_end']['total_moisture_basis']['total_moisture'], d['samples'][0]['unloading_end']['total_moisture_basis']['ash'], d['samples'][0]['unloading_end']['total_moisture_basis']['vm'], d['samples'][0]['unloading_end']['total_moisture_basis']['gcv'], d['samples'][0]['unloading_end']['disputed_lab']])
        index +=1

        for s in range(len(d['samples'])):
            if s != 0:
                res.append(['', '', '', '', '', '', '', '', d['samples'][s]['billed_grade'], d['samples'][s]['total_quantity'], d['samples'][s]['loading_end']['ash'], d['samples'][s]['loading_end']['vm'], d['samples'][s]['loading_end']['gcv_cimfer'], d['samples'][s]['loading_end']['gcv_npgc'], d['samples'][s]['loading_end']['equilibrated_moisture'], d['samples'][s]['loading_end']['total_moisture'], d['samples'][s]['loading_end']['disputed_by_cimfer'], d['samples'][s]['loading_end']['disputed_lab'], d['samples'][s]['unloading_end']['equilibrated_basis']['equilibrated_moisture'], d['samples'][s]['unloading_end']['equilibrated_basis']['ash'], d['samples'][s]['unloading_end']['equilibrated_basis']['vm'], d['samples'][s]['unloading_end']['equilibrated_basis']['gcv_cimfer'], d['samples'][s]['unloading_end']['equilibrated_basis']['gcv_npgc'], d['samples'][s]['unloading_end']['total_moisture_basis']['total_moisture'], d['samples'][s]['unloading_end']['total_moisture_basis']['ash'], d['samples'][s]['unloading_end']['total_moisture_basis']['vm'], d['samples'][s]['unloading_end']['total_moisture_basis']['gcv'], d['samples'][s]['unloading_end']['disputed_lab']])

    worksheet.set_row(0, cell_format=workbook.add_format({'bold': True}))
    worksheet.set_row(1, cell_format=workbook.add_format({'bold': True}))
    worksheet.set_row(2, cell_format=workbook.add_format({'bold': True}))
    worksheet.set_row(3, cell_format=workbook.add_format({'bold': True}))

    row = 3
    for rw in res:
        col = 0
        for cl in rw:
            worksheet.write(row, col, cl)
            col += 1
        row += 1

    workbook.close()
