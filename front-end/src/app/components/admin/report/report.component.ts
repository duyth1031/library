import { Component, OnInit } from '@angular/core';
import { DropDownData } from '../../common/dropdown/dropdown.component';

@Component({
    selector: 'report',
    templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
    private listData: DropDownData[] = [];
    private typeSelected: number = ReportType.DebtBook;
    private ReportType: any = ReportType;

    public ngOnInit(): void {
        this.listData.push(new DropDownData(ReportType.DebtBook, 'Bạn đọc nợ sách'));
        this.listData.push(new DropDownData(ReportType.TopBook, 'Sách được mượn nhiều'));
    }

    private selectType(type: DropDownData): void {
        this.typeSelected = type.key;
    }
}

enum ReportType {
    DebtBook = 1,
    TopBook = 2
}
